import { Box, Button, Drawer, Grid } from '@mui/material';
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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getAuth, signOut } from 'firebase/auth';
import FlagMenu from './FlagMenu';
import SideBar from './SideBar';

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
  const [openDrawer, setOPenDrawer] = useState(false);
  const context = useContext(AppContext);
  let url = new URL(window.location.href);
  const location = useLocation();
  // console.log(context);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOPenDrawer(open);
  };
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
      sx={{
        justifyContent: {
          xs: 'space-between',
          sm: 'space-between',
          md: 'space-between',
          lg: 'flex-end',
        },
        position: 'sticky',
        top: 0,
        bgcolor: 'background.default',
        boxShadow: '0 1px 8px -10px rgb(117, 117, 117, 0.1), 0 7px 10px 0 rgb(117, 117, 117, 0.1)',
      }}
    >
      <Box sx={{ paddingLeft: '5px', display: { xs: 'block', lg: 'none', xl: 'none' } }}>
        <FormatListBulletedIcon cursor="pointer" onClick={toggleDrawer(true)} />
      </Box>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <SideBar hide={'true'} />
        </div>
      </Drawer>
      <Box sx={{ display: 'flex' }}>
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
      </Box>
    </Grid>
  );
}
