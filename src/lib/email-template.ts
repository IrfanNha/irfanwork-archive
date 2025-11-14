/**
 * HTML Email Template for Contact Form
 */

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  ip?: string;
  userAgent?: string;
  timestamp: string;
  referrer?: string;
}

export function generateContactEmailHTML(data: ContactEmailData): string {
  const { name, email, message, ip, userAgent, timestamp, referrer } = data;

  // Escape HTML to prevent XSS
  const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  // Preserve line breaks in message
  const formattedMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 30px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                📩 New message from your website
              </h1>
            </td>
          </tr>

          <!-- Sender Information -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; color: #333333; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
                Sender Information
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 120px; font-weight: 500;">Name:</td>
                  <td style="padding: 8px 0; color: #333333; font-size: 14px;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666; font-size: 14px; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                    <a href="mailto:${escapeHtml(email)}" style="color: #667eea; text-decoration: none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Content -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 20px; color: #333333; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
                Message
              </h2>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; color: #333333; font-size: 14px; line-height: 1.6;">
                ${formattedMessage}
              </div>
            </td>
          </tr>

          <!-- Metadata -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 20px; color: #333333; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
                Metadata
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; padding: 15px; border-radius: 6px;">
                ${ip ? `
                <tr>
                  <td style="padding: 6px 0; color: #666666; font-size: 13px; width: 140px; font-weight: 500;">IP Address:</td>
                  <td style="padding: 6px 0; color: #333333; font-size: 13px; font-family: monospace;">${escapeHtml(ip)}</td>
                </tr>
                ` : ''}
                ${userAgent ? `
                <tr>
                  <td style="padding: 6px 0; color: #666666; font-size: 13px; font-weight: 500; vertical-align: top;">User-Agent:</td>
                  <td style="padding: 6px 0; color: #333333; font-size: 13px; font-family: monospace; word-break: break-all;">${escapeHtml(userAgent)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 6px 0; color: #666666; font-size: 13px; font-weight: 500;">Timestamp:</td>
                  <td style="padding: 6px 0; color: #333333; font-size: 13px; font-family: monospace;">${escapeHtml(timestamp)}</td>
                </tr>
                ${referrer ? `
                <tr>
                  <td style="padding: 6px 0; color: #666666; font-size: 13px; font-weight: 500;">Referrer:</td>
                  <td style="padding: 6px 0; color: #333333; font-size: 13px;">
                    <a href="${escapeHtml(referrer)}" style="color: #667eea; text-decoration: none; word-break: break-all;">${escapeHtml(referrer)}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; text-align: center; background-color: #f9f9f9; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                This email was sent from your website contact form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

