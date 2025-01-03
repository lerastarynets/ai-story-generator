'use server';

import prisma from '@/lib/prisma';
import { TSaveStoryData } from '@/types/stories';

export async function getStories(page: number, perPage: number) {
  try {
    const [stories, storiesCount] = await Promise.all([
      prisma.story.findMany({
        skip: page * perPage,
        take: perPage,
      }),
      prisma.story.count(),
    ]);

    return {
      success: true,
      data: {
        stories,
        total: storiesCount,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}

export async function getStoryById(id: string) {
  try {
    const story = await prisma.story.findUnique({ where: { id } });
    if (!story) {
      return { success: false, error: 'Story not found' };
    }
    return { success: true, data: story };
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}

export async function saveStory(data: TSaveStoryData) {
  try {
    await prisma.story.create({ data });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to save story' };
  }
}
