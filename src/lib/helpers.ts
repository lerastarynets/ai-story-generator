import { compare, genSalt, hash } from 'bcryptjs';
import crypto from 'crypto';
import { Session } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';

import prisma from '@/lib/prisma';

// Helper function to generate the OpenAI prompt dynamically
export const generatePrompt = ({
  character1,
  character2,
  relationship,
  events,
}: {
  character1: string;
  character2: string;
  relationship: string;
  events: { event: string }[];
}) => {
  let prompt = `Write a story about ${character1} and ${character2}. They have a ${relationship} relationship.`;

  prompt += ' The story should include the following events:\n';
  events.forEach(({ event }, index) => {
    prompt += `${index + 1}. ${event}\n`;
  });

  return prompt;
};

export const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

  const customSalt = await genSalt(saltRounds);

  const hashedPassword = await hash(password, customSalt);

  return hashedPassword;
};

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
  const isMatch = await compare(plainPassword, hashedPassword);
  return isMatch;
};

export const generateVerififcationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await prisma.verificationToken.findFirst({ where: { email } });

  if (existingToken) {
    await prisma.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await prisma.verificationToken.create({ data: { email, expiresAt, token } });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await prisma.resetPasswordToken.findFirst({ where: { email } });

  if (existingToken) {
    await prisma.resetPasswordToken.delete({ where: { id: existingToken.id } });
  }

  const resetPasswordToken = await prisma.resetPasswordToken.create({ data: { email, expiresAt, token } });

  return resetPasswordToken;
};

export const generate2FAToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiresAt = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await prisma.twoFactorToken.findFirst({ where: { email } });

  if (existingToken) {
    await prisma.twoFactorToken.delete({ where: { id: existingToken.id } });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({ data: { email, expiresAt, token } });

  return twoFactorToken;
};

export const getStatus = (loading: boolean, session: Session | null) => {
  if (loading) return 'loading';
  if (session) return 'authenticated';
  return 'unauthenticated';
};
