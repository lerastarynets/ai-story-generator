import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from '../lib/theme';
import CssBaseline from "@mui/material/CssBaseline";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body>
       <AppRouterCacheProvider options={{ enableCssLayer: true}}>
        <ThemeProvider theme={theme}>
          <>
            <CssBaseline />
            {children}
          </>
        </ThemeProvider>
      </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
