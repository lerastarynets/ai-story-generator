import { GitHub, Google } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import { toastError, toastSuccess } from '@/lib/toastUtils';
import { socialLogIn } from '@/server-actions/auth';
import { TAuthProvider } from '@/types/auth';

const SocialMediaButtons = () => {
  const handleSocialLogin = async (provider: TAuthProvider) => {
    try {
      const response = await socialLogIn(provider);

      if (response?.error) {
        return toastError(response.error);
      }

      toastSuccess('Login successful!');
    } catch (error) {
      toastError(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <Box className='flex justify-around'>
      <IconButton onClick={() => handleSocialLogin('google')} color='secondary'>
        <Google />
      </IconButton>
      <IconButton onClick={() => handleSocialLogin('github')} color='secondary'>
        <GitHub />
      </IconButton>
    </Box>
  );
};

export default SocialMediaButtons;
