'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { toastError, toastSuccess } from '@/lib/toastUtils';
import { verifyEmail } from '@/server-actions/auth';

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { push } = useRouter();

  useEffect(() => {
    if (!token) {
      return toastError('Missing token');
    }

    (async () => {
      try {
        const response = await verifyEmail(token);

        if (!response.success) {
          return toastError(response.error);
        }

        toastSuccess('Email verified!');
        push('/login');
      } catch (error) {
        toastError(`An unexpected error occurred: ${error}`);
      }
    })();
  }, [token]);

  return (
    <Box className='flex flex-col items-center justify-center gap-4'>
      <Typography variant='h5'>Verifying...</Typography>
      <CircularProgress color='secondary' size='60px' />
    </Box>
  );
};

export default Page;
