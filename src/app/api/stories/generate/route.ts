import { NextRequest } from 'next/server';

import { generateStorySchema } from '../../../../lib/formSchemas';
import { generatePrompt } from '../../../../lib/helpers';
import { generateStory } from '../../../../lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await generateStorySchema.validate(body);

    const prompt = generatePrompt(body);
    const story = await generateStory(prompt);

    return Response.json({ story });
  } catch (error: any) {
    return Response.json({ error: error?.message || 'Something went wrong' }, { status: 500 });
  }
}
