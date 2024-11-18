'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { resetPasswordSchema } from '@/lib/formSchemas';
import { toastError, toastSuccess } from '@/lib/toastUtils';
import { resetPassword } from '@/server-actions/auth';
import { TResetPasswordData } from '@/types/auth';

const defaultValues = { password: '', confirmPassword: '' };

const Page = () => {
  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(resetPasswordSchema),
  });

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleReset = async (formData: TResetPasswordData) => {
    try {
      const response = await resetPassword(formData, token);

      if (response?.error) {
        return toastError(response.error);
      }

      toastSuccess('Password reset successful!');
      push('/login');
    } catch (error) {
      toastError(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <Box className='w-[300px] space-y-3'>
      <Typography variant='h5'>Enter new password</Typography>
      <form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleReset)}>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              label='New Password'
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
              label='Confirm new password'
              variant='outlined'
              color='secondary'
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <LoadingButton type='submit' loading={isSubmitting} variant='contained' color='secondary' disabled={!isValid}>
          Reset password
        </LoadingButton>
      </form>
    </Box>
  );
};

export default Page;
