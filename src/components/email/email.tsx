import { EmailTemplate } from './email-template';
import * as nodemailer from 'nodemailer';
import { render } from '@react-email/render';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

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

  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: `${appName} <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: emailHtml,
    });

    return { id: info.messageId, success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { error, success: false };
  }
}
