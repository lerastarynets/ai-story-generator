import { Alert, AlertProps } from '@mui/material';
import React from 'react';
import { toast, ToastContent } from 'react-toastify';

const createToast = (severity: AlertProps['severity'], message: AlertProps['children']) => {
  const ToastContent: ToastContent = () => (
    <Alert variant='filled' severity={severity}>
      {message}
    </Alert>
  );

  toast(ToastContent);
};

export const toastSuccess = (message: string) => {
  createToast('success', message);
};

export const toastError = (message: string) => {
  createToast('error', message);
};

export const toastInfo = (message: string) => {
  createToast('info', message);
};

export const toastWarning = (message: string) => {
  createToast('warning', message);
};
