import { Box, Button, Grid } from '@mui/material';
import { barText } from '../texts';
import { getText } from '../texts';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Logo from '../images/logo1.png';
import { Badge, styled, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Link, useLocation } from 'react-router-dom';
import { BusketIcon } from '../SVGIcons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getAuth, signOut } from 'firebase/auth';
import FlagMenu from './FlagMenu';

export function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    setAnchorEl(null);
  }
  return (
    <Box display="flex" alignContent="center">
      <AccountCircleIcon
        color="primary"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ cursor: 'pointer' }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link
          style={{ color: 'inherit', display: 'block', width: '100%', textDecoration: 'none' }}
          to="/admin"
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={signOutUser}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default function BarMenu() {
  const context = useContext(AppContext);
  let url = new URL(window.location.href);
  const location = useLocation();
  console.log(context);

  const handleCLickDarkMode = () => {
    if (context.darkMode === 'light') {
      context.setDarkMode('dark');
      localStorage.setItem('darkMode', 'dark');
    } else {
      context.setDarkMode('light');
      localStorage.setItem('darkMode', 'light');
    }
  };
  return (
    <Grid
      p="5px 10px 0 0"
      item
      container
      xs={12}
      justifyContent="flex-end"
      sx={{
        position: 'sticky',
        top: 0,
        bgcolor: 'background.default',
        boxShadow: '0 1px 8px -10px rgb(117, 117, 117, 0.1), 0 7px 10px 0 rgb(117, 117, 117, 0.1)',
      }}
    >
      <FlagMenu />
      <div style={{ cursor: 'pointer', padding: '0 10px 0 10px' }} onClick={handleCLickDarkMode}>
        {context.darkMode === 'dark' ? (
          <LightModeOutlinedIcon sx={{ color: 'greenCustome.main' }} />
        ) : (
          <DarkModeOutlinedIcon color="success" />
        )}
      </div>

      {context.user ? (
        <UserMenu />
      ) : (
        <Link
          to={
            url.pathname.includes('signin') ? url.search : `/signin/?${location.pathname + location.search}`
          }
          style={{
            color: context.darkMode === 'dark' ? '#cfd8dc' : '#546e7a',
            // padding: '5px',
            textDecoration: 'none',
          }}
        >
          {getText('signIn', context.language, barText)}
        </Link>
      )}
    </Grid>
  );
}
