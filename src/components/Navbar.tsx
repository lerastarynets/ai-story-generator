'use client';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

import { useSession } from '@/hooks/useSession';
import { NAVBAR_PAGES, NAVBAR_SETTINGS } from '@/lib/constants';
import { toastError, toastSuccess } from '@/lib/toastUtils';
import { logOut } from '@/server-actions/auth';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { data: session } = useSession();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      const response = await logOut();

      if (response?.error) {
        return toastError(response.error);
      }

      toastSuccess('Logout successful!');
    } catch (error) {
      toastError(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <AppBar position='fixed' color='secondary'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon className='xs:hidden mr-2 md:flex' />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#'
            className='xs:hidden mr-4 font-bold text-inherit no-underline md:flex'
          >
            LOGO
          </Typography>

          {session && (
            <Box className='xs:flex grow md:hidden'>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                className='xs:block grow md:hidden'
              >
                {NAVBAR_PAGES.map(({ name, path }) => (
                  <MenuItem key={name}>
                    <Link className='text-black no-underline' href={path}>
                      <Typography align='center'>{name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <AdbIcon className='xs:flex mr-2 md:hidden' />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            className='xs:flex mr-4 grow font-bold text-inherit no-underline md:hidden'
          >
            LOGO
          </Typography>
          {session && (
            <>
              <Box className='xs:hidden grow md:flex'>
                {NAVBAR_PAGES.map(({ name, path }) => (
                  <Link className='no-underline' href={path} key={name}>
                    <Button className='my-4 block text-white'>{name}</Button>
                  </Link>
                ))}
              </Box>
              <Box className='grow-0'>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} className='p-0'>
                    <Avatar alt='Remy Sharp' />
                  </IconButton>
                </Tooltip>
                <Menu
                  className='mt-11'
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {NAVBAR_SETTINGS.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography onClick={handleLogOut} align='center'>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
