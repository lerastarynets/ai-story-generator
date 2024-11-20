'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import OAuthError from '@/components/OAuthError';
import SocialMediaButtons from '@/components/SocialMediaButtons';
import { logInSchema } from '@/lib/formSchemas';
import { toastError, toastSuccess } from '@/lib/toastUtils';
import { logIn } from '@/server-actions/auth';
import { TLogInData } from '@/types/auth';

const defaultValues = { email: '', password: '', twoFactorCode: undefined };

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(logInSchema),
  });

  const [show2FAField, setShow2FAField] = useState(false);

  const handleLogin = async (formData: TLogInData) => {
    try {
      const response = await logIn(formData);

      if (response?.error) {
        return toastError(response.error);
      }

      if (response?.data?.twoFactor) {
        setShow2FAField(true);
        return toastSuccess('2FA code sent to your email!');
      }

      toastSuccess('Login successful!');
    } catch (error) {
      toastError(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <Box className='w-[300px] space-y-3'>
      <Typography variant='h5'>{show2FAField ? '2FA Code' : 'Log In'}</Typography>
      <form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleLogin)}>
        {show2FAField ? (
          <Controller
            name='twoFactorCode'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type='text'
                placeholder='123456'
                variant='outlined'
                color='secondary'
                fullWidth
                error={!!errors.twoFactorCode}
                helperText={errors.twoFactorCode?.message}
              />
            )}
          />
        ) : (
          <>
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
          </>
        )}

        <OAuthError />

        <LoadingButton type='submit' loading={isSubmitting} variant='contained' color='secondary' disabled={!isValid}>
          {show2FAField ? 'Confirm' : 'Log In'}
        </LoadingButton>
      </form>

      <SocialMediaButtons />

      <Typography variant='body2' component={Link} href='/forgot-password'>
        Forgot your password?
      </Typography>

      <Typography variant='body2'>
        Don’t have an account? <Link href='/signup'>Sign up</Link>
      </Typography>
    </Box>
  );
};

export default Page;
