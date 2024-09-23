'use server';

import prisma from '../lib/prisma';

export async function getStoryById(id: string) {
  return await prisma.story.findUnique({
    where: { id },
  });
}
