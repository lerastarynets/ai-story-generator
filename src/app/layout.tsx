import './globals.css';
import 'react-toastify/ReactToastify.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import theme from '../lib/theme';

const defaultToastOptions: ToastContainerProps = {
  position: 'bottom-right',
  autoClose: 5000,
  toastClassName: '!p-0 !min-h-12',
  closeButton: false,
  bodyClassName: '!p-0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <>
              <CssBaseline />
              <ToastContainer {...defaultToastOptions} />
              {children}
            </>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
