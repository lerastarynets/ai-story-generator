'use server';

import prisma from '@/lib/prisma';

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}
