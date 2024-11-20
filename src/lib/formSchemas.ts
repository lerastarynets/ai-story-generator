import * as yup from 'yup';

import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '@/lib/constants';

const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`)
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/\d/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*(),.;?":{}|<>]/, 'Password must contain at least one special character');

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

export const logInSchema = yup.object({
  email: yup.string().email('Ivalid email format').required('Email is required'),
  password: passwordSchema,
  twoFactorCode: yup.string().matches(/^\d{6}$/, 'The code must be exactly 6 digits'),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email('Ivalid email format').required('Email is required'),
});

export const resetPasswordSchema = yup.object({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords are not equal.', function testMatch(value) {
      return this.parent.password === value;
    })
    .required('Please confirm your password.'),
});

export const signUpSchema = yup.object({
  email: yup.string().email('Ivalid email format').required('Email is required'),
  name: yup
    .string()
    .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters long`)
    .required('Name is required'),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function testMatch(value) {
      return this.parent.password === value;
    })
    .required('Please confirm your password'),
});

export const settingsSchema = yup.object({
  is2FAEnabled: yup.boolean(),
});
