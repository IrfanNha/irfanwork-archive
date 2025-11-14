import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { verifyRecaptcha, detectSpamPatterns } from '@/lib/recaptcha';
import { generateContactEmailHTML } from '@/lib/email-template';

// Rate limiting: in-memory store (Map<IP, timestamp>)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 5000; // 5 seconds in milliseconds

/**
 * Get client IP address from request headers
 */
function getClientIP(request: NextRequest): string {
  // Check x-forwarded-for header (first IP in chain)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip) => ip.trim());
    return ips[0] || 'unknown';
  }

  // Check X-Real-IP header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback
  return 'unknown';
}

/**
 * Check rate limit for IP address
 */
function checkRateLimit(ip: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now();
  const lastSubmission = rateLimitMap.get(ip);

  if (lastSubmission) {
    const timeSinceLastSubmission = now - lastSubmission;
    if (timeSinceLastSubmission < RATE_LIMIT_WINDOW) {
      const remainingTime = Math.ceil((RATE_LIMIT_WINDOW - timeSinceLastSubmission) / 1000);
      return { allowed: false, remainingTime };
    }
  }

  // Update rate limit
  rateLimitMap.set(ip, now);

  // Clean up old entries (prevent memory leak)
  if (rateLimitMap.size > 1000) {
    const entries = Array.from(rateLimitMap.entries());
    const cutoff = now - RATE_LIMIT_WINDOW * 2;
    entries.forEach(([key, value]) => {
      if (value < cutoff) {
        rateLimitMap.delete(key);
      }
    });
  }

  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Check Web3Forms access key (server-side only, not NEXT_PUBLIC)
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!web3formsAccessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not set in environment variables');
      return NextResponse.json(
        {
          error: 'Server configuration error. Please try again later.',
          details: process.env.NODE_ENV === 'development' 
            ? 'WEB3FORMS_ACCESS_KEY environment variable is not set' 
            : undefined,
        },
        { status: 500 }
      );
    }

    // Get client information
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || undefined;

    // Check rate limit
    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait a moment before submitting again.',
          remainingTime: rateLimitCheck.remainingTime,
        },
        { status: 429 }
      );
    }

    // Parse FormData from request
    let formData;
    try {
      formData = await request.formData();
    } catch (parseError) {
      console.error('Failed to parse FormData:', parseError);
      return NextResponse.json(
        {
          error: 'Invalid request format.',
        },
        { status: 400 }
      );
    }

    // Extract form fields
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    const recaptchaToken = formData.get('recaptchaToken')?.toString() || '';

    // Validate using Zod schema
    const validationResult = contactSchema.safeParse({
      name,
      email,
      message,
      recaptchaToken,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Check for spam patterns in message
    if (detectSpamPatterns(message)) {
      return NextResponse.json(
        {
          error: 'Message contains suspicious content and cannot be sent.',
        },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        {
          error: 'Server configuration error. Please try again later.',
          details: process.env.NODE_ENV === 'development' 
            ? 'RECAPTCHA_SECRET_KEY environment variable is not set' 
            : undefined,
        },
        { status: 500 }
      );
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken, recaptchaSecretKey);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          error: recaptchaResult.error || 'reCAPTCHA verification failed',
        },
        { status: 400 }
      );
    }

    // Prepare email data
    const timestamp = new Date().toISOString();
    
    // Generate HTML email content with metadata
    const emailHTML = generateContactEmailHTML({
      name,
      email,
      message,
      ip,
      userAgent,
      timestamp,
      referrer,
    });

    // Create FormData for Web3Forms
    const web3formsData = new FormData();
    web3formsData.append('access_key', web3formsAccessKey);
    web3formsData.append('subject', `New Contact Form Message from ${name}`);
    web3formsData.append('from_name', name);
    web3formsData.append('from_email', email);
    web3formsData.append('message', emailHTML);
    web3formsData.append('_template', 'table');
    web3formsData.append('_captcha', 'false'); // We handle reCAPTCHA separately

    // Send to Web3Forms API
    try {
      const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3formsData, // No Content-Type header - browser sets it automatically for FormData
      });

      let web3formsResult;
      try {
        web3formsResult = await web3formsResponse.json();
      } catch (jsonError) {
        console.error('Failed to parse Web3Forms response:', jsonError);
        return NextResponse.json(
          {
            error: 'Failed to send email. Please try again later.',
            details: 'Invalid response from email service',
          },
          { status: 500 }
        );
      }

      // Web3Forms returns HTTP 200 even on errors, so check the success field
      if (!web3formsResult.success) {
        console.error('Web3Forms API error:', JSON.stringify(web3formsResult, null, 2));
        
        // Handle specific Web3Forms error types
        let errorMessage = 'Failed to send email. Please try again later.';
        if (web3formsResult.error === 'browser-error') {
          errorMessage = 'Browser validation error. Please check your form data.';
        } else if (web3formsResult.error === 'validation-error') {
          errorMessage = 'Form validation failed. Please check all required fields.';
        } else if (web3formsResult.message) {
          errorMessage = web3formsResult.message;
        }
        
        return NextResponse.json(
          {
            error: errorMessage,
            details: web3formsResult.error || 'Unknown error',
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Your message has been sent successfully!',
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Web3Forms API exception:', emailError);
      return NextResponse.json(
        {
          error: 'Failed to send email. Please try again later.',
          details: emailError instanceof Error ? emailError.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error stack:', errorStack);
    
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
