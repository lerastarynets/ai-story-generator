import * as yup from 'yup';

export const generateStorySchema = yup.object({
  character1: yup.string().required('Character 1 is required'),
  character2: yup.string().required('Character 2 is required'),
  relationship: yup.string().required('Relationship is required'),
  events: yup
    .array(yup.object({ event: yup.string().required('Event is required') }))
    .min(1, 'At least one event is required')
    .required(),
});

export const saveStorySchema = yup.object({
  name: yup.string().required('Name is required'),
  content: yup.string().required('Text is required'),
});
