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
    <Box display="flex" alignContent="center" p="5px">
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
        <MenuItem onClick={handleClose}>
          <Link style={{ color: 'inherit' }} className="linko" to="/admin">
            Profile
          </Link>
        </MenuItem>
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
  // console.log(context);

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
    <Grid item container xs={12} justifyContent="center">
      {/* <img src={Logo} style={{ maxWidth: '100px', height: 'auto' }} /> */}
      <Box sx={{ flexGrow: 1, justifyContent: 'center', padding: '5px' }}>
        <Link style={{ color: context.darkMode === 'dark' ? '#2196f3' : '#1565c0' }} className="linko" to="/">
          {getText('home', context.language, barText)}
        </Link>
      </Box>

      {/* <Link className="linko" to="/about">
        about
      </Link> */}

      {context.user ? (
        <UserMenu />
      ) : (
        <Link
          to={
            url.pathname.includes('signin') ? url.search : `/signin/?${location.pathname + location.search}`
          }
          style={{
            color: context.darkMode === 'dark' ? '#2196f3' : '#1565c0',
            padding: '5px',
            textDecoration: 'none',
          }}
        >
          sign in
        </Link>
      )}
      <div style={{ cursor: 'pointer', padding: '5px' }} onClick={handleCLickDarkMode}>
        {context.darkMode === 'dark' ? (
          <LightModeOutlinedIcon sx={{ color: 'greenCustome.main' }} />
        ) : (
          <DarkModeOutlinedIcon color="success" />
        )}
      </div>
    </Grid>
  );
}
