import { Alert } from '@mui/material';
import { useSearchParams } from 'next/navigation';

import { OAUTH_ERROR_ID } from '@/lib/constants';

const OAuthError = () => {
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get('error') === OAUTH_ERROR_ID ? 'Another account already exists with the same email address' : '';

  if (!urlError) return;

  return <Alert severity='error'>{urlError}</Alert>;
};

export default OAuthError;
