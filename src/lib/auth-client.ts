import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';
import { nextCookies } from 'better-auth/next-js';
import { auth } from './auth';

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
    nextCookies(),
  ],
});

export type Session = typeof authClient.$Infer.Session;
