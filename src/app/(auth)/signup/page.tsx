'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import OAuthError from '@/components/OAuthError';
import SocialMediaButtons from '@/components/SocialMediaButtons';
import { signUpSchema } from '@/lib/formSchemas';
import { toastError, toastSuccess } from '@/lib/toastUtils';
import { signUp } from '@/server-actions/auth';
import { TSignUpData } from '@/types/auth';

const defaultValues = { email: '', name: '', password: '', confirmPassword: '' };

const SignupForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });

  const handleSignup = async (formData: TSignUpData) => {
    try {
      await signUp(formData);

      //   if (!response.success) {
      //     return toastError(response.error);
      //   }

      toastSuccess('Signup successful!');
    } catch (error) {
      toastError(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <Box className='w-[300px] space-y-3'>
      <Typography variant='h5'>Sign Up</Typography>
      <form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleSignup)}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Name'
              variant='outlined'
              color='secondary'
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Email'
              variant='outlined'
              color='secondary'
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              label='Password'
              variant='outlined'
              color='secondary'
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              label='Confirm Password'
              variant='outlined'
              color='secondary'
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <OAuthError />

        <SocialMediaButtons />

        <LoadingButton type='submit' loading={isSubmitting} variant='contained' color='secondary' disabled={!isValid}>
          Sign Up
        </LoadingButton>
      </form>
      <Typography variant='body2'>
        Already have an account? <Link href='/login'>Log in</Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
