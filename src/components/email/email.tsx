import { EmailTemplate } from './email-template';
import { Resend } from 'resend';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTP({
  otp,
  appName,
  subject,
  email,
}: {
  otp: string;
  appName: string;
  subject: string;
  email: string;
}) {
  const emailHtml = await render(EmailTemplate({ otp, appName }));

  const { data, error } = await resend.emails.send({
    from: `${appName} <${process.env.RESEND_FROM_EMAIL}>`,
    to: [email],
    subject: subject,
    html: emailHtml,
  });

  if (error) {
    return error;
  }

  return data;
}
