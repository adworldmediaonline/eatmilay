import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  otp: string;
  appName: string;
}

export function EmailTemplate({ otp, appName }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your {appName} verification code is {otp}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={h1}>{appName}</Heading>
          </Section>

          <Heading style={h2}>Verify your email address</Heading>

          <Text style={text}>
            Welcome to {appName}! To complete your registration, please use the
            verification code below:
          </Text>

          <Section style={codeContainer}>
            <Text style={code}>{otp}</Text>
          </Section>

          <Text style={text}>
            This code will expire in 10 minutes for security reasons.
          </Text>

          <Text style={text}>
            If you didn't request this verification code, please ignore this
            email.
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              Best regards,
              <br />
              The {appName} Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoContainer = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#1f2937',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const codeContainer = {
  background: '#f3f4f6',
  borderRadius: '8px',
  margin: '32px auto',
  padding: '24px',
  textAlign: 'center' as const,
  width: 'fit-content',
};

const code = {
  color: '#1f2937',
  fontSize: '32px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  margin: '0',
  padding: '0',
  textAlign: 'center' as const,
};

const footer = {
  borderTop: '1px solid #e5e7eb',
  marginTop: '32px',
  paddingTop: '24px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
  textAlign: 'center' as const,
};
