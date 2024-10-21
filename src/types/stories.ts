import * as yup from 'yup';

import { saveStorySchema } from '@/lib/formSchemas';

export interface IStory {
  id: string;
  name: string;
  createdAt: Date;
}

export type TSaveStoryData = yup.InferType<typeof saveStorySchema>;
