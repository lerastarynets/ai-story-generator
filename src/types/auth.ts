import * as yup from 'yup';

import { forgotPasswordSchema, logInSchema, resetPasswordSchema, signUpSchema } from '@/lib/formSchemas';

export type TLogInData = yup.InferType<typeof logInSchema>;

export type TSignUpData = yup.InferType<typeof signUpSchema>;

export type TResetPasswordData = yup.InferType<typeof resetPasswordSchema>;

export type TForgotPasswordData = yup.InferType<typeof forgotPasswordSchema>;

export type TAuthProvider = 'google' | 'github';
