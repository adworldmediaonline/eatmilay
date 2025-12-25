// import { PrismaClient } from '@prisma/client/edge';
import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
import { sendOTP } from '../components/email/email';
import { getInitials } from './get-initials';

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),

  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
        defaultValue: 'user',
      },
      initials: {
        type: 'string',
        input: false,
        defaultValue: '',
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async user => {
          const userCount = await prisma.user.count();
          if (userCount === 0) {
            return {
              data: {
                ...user,
                role: 'admin',
                initials: getInitials(user.name),
              },
            };
          }
          return { data: { ...user, initials: getInitials(user.name) } };
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  emailVerification: {
    autoSignInAfterVerification: true,
  },

  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      sendVerificationOnSignUp: true,
      expiresIn: 10 * 60,
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        let subject = '';
        if (type === 'sign-in') {
          subject = 'Sign in to your account';
        } else if (type === 'email-verification') {
          subject = 'Verify your email';
        } else {
          subject = 'Reset your password';
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error('User not found');
        }
        await sendOTP({
          otp,
          appName: 'SUMNSUBSTANCE',
          subject,
          email,
        });
      },
    }),
    nextCookies(),
  ],

  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
