import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { logInSchema } from '@/lib/formSchemas';
import { verifyPassword } from '@/lib/helpers';
import { getUserByEmail } from '@/server-actions/user';

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedData = await logInSchema.validate(credentials);

        if (validatedData) {
          const { email, password } = validatedData;

          const { data: user } = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const isValidPassword = await verifyPassword(password, user.password);

          if (!isValidPassword) {
            return null;
          }

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
