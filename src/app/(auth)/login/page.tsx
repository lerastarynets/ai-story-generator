'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import { logInSchema } from '@/lib/formSchemas';
import { toastError, toastSuccess } from '@/lib/toastUtils';
import { logIn } from '@/server-actions/auth';
import { TLogInData } from '@/types/auth';

const defaultValues = { email: '', password: '' };

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

  const handleLogin = async (formData: TLogInData) => {
    try {
      await logIn(formData);

      //   if (!response.success) {
      //     return toastError(response.error);
      //   }

      toastSuccess('Login successful!');
    } catch (error) {
      toastError(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <Box className='w-[300px] space-y-3'>
      <Typography variant='h5'>Log In</Typography>
      <form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleLogin)}>
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
        <LoadingButton type='submit' loading={isSubmitting} variant='contained' color='secondary' disabled={!isValid}>
          Log In
        </LoadingButton>
      </form>
      <Typography variant='body2'>
        Don’t have an account? <Link href='/signup'>Sign up</Link>
      </Typography>
    </Box>
  );
};

export default Page;
