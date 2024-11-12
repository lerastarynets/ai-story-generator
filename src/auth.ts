import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

import authConfig from '@/auth.config';
import prisma from '@/lib/prisma';
import { getUserById } from '@/server-actions/user';

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession['user'];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: { error: '/error', signIn: '/login' },
  events: {
    async linkAccount({ user: { id } }) {
      await prisma.user.update({ where: { id }, data: { emailVerified: new Date() } });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      if (user.id) {
        const { data: existingUser } = await getUserById(user.id);
        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const { data: existingUser } = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
