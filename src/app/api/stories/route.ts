import { NextRequest } from 'next/server';

import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../../lib/constants';
import prisma from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
    const perPage = Number(searchParams.get('perPage')) || DEFAULT_PER_PAGE;

    const stories = await prisma.story.findMany({
      skip: page * perPage,
      take: perPage,
    });

    const storiesCount = await prisma.story.count();
    return Response.json(
      {
        stories,
        total: storiesCount,
        page,
        perPage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
