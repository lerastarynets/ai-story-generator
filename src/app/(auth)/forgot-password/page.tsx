'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { forgotPasswordSchema } from '@/lib/formSchemas';
import { toastError, toastSuccess } from '@/lib/toastUtils';
import { sendResetInstructions } from '@/server-actions/auth';
import { TForgotPasswordData } from '@/types/auth';

const defaultValues = { email: '' };

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleSendInstructions = async (formData: TForgotPasswordData) => {
    try {
      const response = await sendResetInstructions(formData);

      if (response?.error) {
        return toastError(response.error);
      }

      toastSuccess('Instructions sent!');
    } catch (error) {
      toastError(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <Box className='w-[300px] space-y-3'>
      <Typography variant='h5'>Forgot your password?</Typography>
      <Typography variant='body2'>Please enter your email so we can send you reset instructions</Typography>
      <form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleSendInstructions)}>
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

        <LoadingButton type='submit' loading={isSubmitting} variant='contained' color='secondary' disabled={!isValid}>
          Send reset instructions
        </LoadingButton>
      </form>
    </Box>
  );
};

export default Page;
