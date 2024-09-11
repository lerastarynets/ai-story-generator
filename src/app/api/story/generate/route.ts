import { NextRequest } from 'next/server';

import { generatePrompt } from '../../../../lib/helpers';
import { generateStory } from '../../../../lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = generatePrompt(body);
    const res = await generateStory(prompt);

    return Response.json(res);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
