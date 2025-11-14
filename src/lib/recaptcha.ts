/**
 * Google reCAPTCHA v3 utilities
 */

interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verify reCAPTCHA v3 token on the server
 */
export async function verifyRecaptcha(
  token: string,
  secretKey: string
): Promise<{ success: boolean; score: number; error?: string }> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        score: 0,
        error: 'Failed to verify reCAPTCHA',
      };
    }

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        score: 0,
        error: data['error-codes']?.join(', ') || 'reCAPTCHA verification failed',
      };
    }

    // Check score threshold (0.5 is recommended)
    if (data.score < 0.5) {
      return {
        success: false,
        score: data.score,
        error: 'Low reCAPTCHA score - possible spam',
      };
    }

    return {
      success: true,
      score: data.score,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      score: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if message contains spam patterns
 */
export function detectSpamPatterns(message: string): boolean {
  // Check for repeated characters (common spam pattern)
  const repeatedCharPattern = /(.)\1{10,}/;
  if (repeatedCharPattern.test(message)) {
    return true;
  }

  // Check for excessive links
  const linkPattern = /https?:\/\//gi;
  const linkCount = (message.match(linkPattern) || []).length;
  if (linkCount > 5) {
    return true;
  }

  // Check for common spam keywords (basic check)
  const spamKeywords = [
    /\b(viagra|cialis|casino|poker|lottery|winner|prize|free money)\b/gi,
  ];
  if (spamKeywords.some((pattern) => pattern.test(message))) {
    return true;
  }

  return false;
}

