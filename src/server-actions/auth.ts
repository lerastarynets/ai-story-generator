'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/auth';
import { hashPassword } from '@/lib/helpers';
import prisma from '@/lib/prisma';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { TLogInData, TSignUpData } from '@/types/auth';

export async function logIn(data: TLogInData) {
  try {
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

export async function logOut() {
  try {
    await signOut();
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

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}
