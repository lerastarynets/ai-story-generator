'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/auth';
import { generateVerififcationToken, hashPassword } from '@/lib/helpers';
import { sendEmail } from '@/lib/mail';
import prisma from '@/lib/prisma';
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGOUT_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/server-actions/user';
import { TAuthProvider, TLogInData, TSignUpData } from '@/types/auth';

export async function logIn(data: TLogInData) {
  try {
    const { email } = data;
    const { data: existingUser } = await getUserByEmail(email);

    if (!existingUser?.emailVerified) {
      const { token } = await generateVerififcationToken(email);

      await sendEmail(email, token);
      return { success: false, error: 'Email is not verified for this account! We have resent you the verification email.' };
    }

    await signIn('credentials', { ...data, redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid credentials!' };
        default:
          return { success: false, error: 'Authentication error' };
      }
    }

    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, error: error.message || 'Server error' };
  }
}

export async function socialLogIn(provider: TAuthProvider) {
  try {
    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid credentials!' };
        default:
          return { success: false, error: 'Authentication error' };
      }
    }

    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, error: error.message || 'Server error' };
  }
}

export async function logOut() {
  try {
    await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT });
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, error: error.message || 'Server error' };
  }
}

export async function signUp(data: TSignUpData) {
  try {
    const { password, email, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { success: false, error: 'Email is already in use' };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({ data: { email, name, password: hashedPassword } });

    const { token } = await generateVerififcationToken(email);

    await sendEmail(email, token);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({ where: { token } });

    if (!verificationToken) {
      return { success: false, error: 'Token does not exist' };
    }

    const hasExpired = new Date(verificationToken.expiresAt) < new Date();

    if (hasExpired) {
      return { success: false, error: 'Token has expired' };
    }

    const { data: user } = await getUserByEmail(verificationToken.email);

    if (!user) {
      return { success: false, error: 'Email does not exist' };
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(), email: verificationToken.email },
      });

      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}
