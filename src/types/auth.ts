import * as yup from 'yup';

import { logInSchema, signUpSchema } from '@/lib/formSchemas';

export type TLogInData = yup.InferType<typeof logInSchema>;

export type TSignUpData = yup.InferType<typeof signUpSchema>;
