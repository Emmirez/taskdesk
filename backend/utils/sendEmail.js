// utils/sendEmail.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  await sgMail.send({
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
};

export const sendPasswordResetEmail = async ({ name, email, resetURL }) => {
  const html = `
    <!DOCTYPE html><html><body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
        <tr><td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
            <tr><td style="background:#7c3aed;padding:28px 32px;text-align:center;">
              <span style="color:#fff;font-size:22px;font-weight:700;">TaskFlow</span>
            </td></tr>
            <tr><td style="padding:36px 32px;">
              <h2 style="margin:0 0 12px;font-size:20px;color:#1e293b;">Hi ${name},</h2>
              <p style="margin:0 0 20px;color:#64748b;line-height:1.6;">
                We received a request to reset your password. This link expires in <strong>15 minutes</strong>.
              </p>
              <div style="text-align:center;margin:28px 0;">
                <a href="${resetURL}" style="background:#7c3aed;color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">
                  Reset Password
                </a>
              </div>
              <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;line-height:1.6;">
                If you didn't request this, you can safely ignore this email.<br/>
                <a href="${resetURL}" style="color:#7c3aed;word-break:break-all;">${resetURL}</a>
              </p>
            </td></tr>
            <tr><td style="padding:16px 32px;border-top:1px solid #f1f5f9;text-align:center;">
              <p style="margin:0;color:#cbd5e1;font-size:12px;">© 2026 TaskFlow. All rights reserved.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>`;

  await sendEmail({ to: email, subject: "Reset your TaskFlow password", html });
};

export const sendVerifyEmail = async ({ name, email, verifyURL }) => {
  const html = `
    <!DOCTYPE html><html><body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
        <tr><td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
            <tr><td style="background:#7c3aed;padding:28px 32px;text-align:center;">
              <span style="color:#fff;font-size:22px;font-weight:700;">TaskFlow</span>
            </td></tr>
            <tr><td style="padding:36px 32px;">
              <h2 style="margin:0 0 12px;font-size:20px;color:#1e293b;">Welcome, ${name}! 🎉</h2>
              <p style="margin:0 0 20px;color:#64748b;line-height:1.6;">
                Thanks for signing up. Verify your email to activate your account.
              </p>
              <div style="text-align:center;margin:28px 0;">
                <a href="${verifyURL}" style="background:#7c3aed;color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">
                  Verify Email
                </a>
              </div>
              <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">This link expires in 24 hours.</p>
            </td></tr>
            <tr><td style="padding:16px 32px;border-top:1px solid #f1f5f9;text-align:center;">
              <p style="margin:0;color:#cbd5e1;font-size:12px;">© 2026 TaskFlow.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>`;

  await sendEmail({ to: email, subject: "Verify your TaskFlow email", html });
};
