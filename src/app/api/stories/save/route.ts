import { NextRequest } from 'next/server';

import { saveStorySchema } from '../../../../lib/formSchemas';
import prisma from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await saveStorySchema.validate(body);

    await prisma.story.create({ data: { content: body.content, name: body.name } });

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error?.message || 'Something went wrong' }, { status: 500 });
  }
}