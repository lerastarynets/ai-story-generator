import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `http://localhost:3000/verification?token=${token}`;

  await resend.emails.send({
    from: 'AI Story Generator <onboarding@resend.dev>',
    to: email,
    subject: 'Account verification',
    html: `<p>Please follow this link to verify your account <strong>${verificationLink}</strong>!</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetPasswordLink = `http://localhost:3000/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'AI Story Generator <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p>Please follow this link to reset the passsword of your account <strong>${resetPasswordLink}</strong>!</p>`,
  });
};
