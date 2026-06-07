import { Resend } from "resend";

// Resend client. Requires RESEND_API_KEY in the environment.
// EMAIL_FROM defaults to Resend's shared test sender, which only delivers to
// the address that owns the Resend account. For real delivery to any address,
// verify a domain in Resend and set EMAIL_FROM to e.g. "KIDO <noreply@yourdomain.com>".
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM || "KIDO <onboarding@resend.dev>";

/** Generate a random 6-digit verification code as a string. */
export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send the verification code by email. Returns true if an email was actually
 * sent. If RESEND_API_KEY is missing, logs the code to the server console
 * (useful for local/dev) and returns false so the caller can surface it.
 */
export async function sendVerificationEmail(to: string, code: string, name?: string): Promise<boolean> {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — verification code for ${to} is: ${code}`);
    return false;
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#F8F7FF;border-radius:16px">
      <h1 style="color:#6C63FF;margin:0 0 8px">Welcome to KIDO! 🌟</h1>
      <p style="color:#1a1a2e;font-size:15px">${name ? `Hi ${name}, ` : ""}use this code to verify your email:</p>
      <div style="font-size:34px;font-weight:800;letter-spacing:8px;color:#1a1a2e;background:#fff;border:2px solid #e8e5ff;border-radius:12px;padding:16px;text-align:center;margin:16px 0">${code}</div>
      <p style="color:#777587;font-size:13px">This code expires in 15 minutes. If you didn't sign up for KIDO, you can ignore this email.</p>
    </div>`;

  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Your KIDO verification code: ${code}`,
      html,
    });
    return true;
  } catch (err) {
    console.error("[email] Failed to send verification email:", err);
    return false;
  }
}
