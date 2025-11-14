import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validation';
import { verifyRecaptcha, detectSpamPatterns } from '@/lib/recaptcha';
import { generateContactEmailHTML } from '@/lib/email-template';
import { SITE_CONFIG } from '@/constants/site';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, recaptchaToken } = validationResult.data;

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
      console.error('RECAPTCHA_SECRET_KEY is not set');
      return NextResponse.json(
        {
          error: 'Server configuration error. Please try again later.',
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
    const recipientEmail = SITE_CONFIG.social.email;

    if (!recipientEmail) {
      console.error('SITE_CONFIG.social.email is not set');
      return NextResponse.json(
        {
          error: 'Server configuration error. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        {
          error: 'Server configuration error. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Generate email HTML
    const emailHTML = generateContactEmailHTML({
      name,
      email,
      message,
      ip,
      userAgent,
      timestamp,
      referrer,
    });

    // Send email using Resend
    // Use environment variable for "from" address, fallback to Resend's test domain
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Contact Form <onboarding@resend.dev>';
    
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: emailHTML,
    });

    if (emailResult.error) {
      console.error('Resend API error:', emailResult.error);
      return NextResponse.json(
        {
          error: 'Failed to send email. Please try again later.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

