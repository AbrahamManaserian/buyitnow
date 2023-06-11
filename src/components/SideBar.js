import { Box, Grid, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { getText, textSideBar } from '../texts';
import { AppContext } from '../App';
import Image1 from '../images/logo12.png';
import {
  AboutIcon,
  ArmFlag,
  CargoIcon,
  CopartIcon,
  EuropeIcon,
  GBFlag,
  GeorgianFlag,
  IAAIIcon,
  NewsIcon,
  PartnerIcon,
  UserIcon,
} from '../SVGIcons';
import styled from '@emotion/styled';

const Grid1 = styled(Grid)(({ theme, menulength }) => ({
  padding: '5px 0 0 0',
  position: 'sticky',
  top: 0,
  bgcolor: 'background.default',
  width: menulength ? '220px' : '100px',
  borderRightStyle: 'dashed',
  borderWidth: 1,
  borderColor: '#e0e0e0',
  zIndex: 1500,
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    width: '0',
  },
  //   '&::-webkit-scrollbar-track': {
  //     boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  //     webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  //   },
  //   '&::-webkit-scrollbar-thumb': {
  //     backgroundColor: 'rgba(0,0,0,.1)',
  //     outline: '1px solid slategrey',
  //   },
  height: '100vh',
}));
const Box1 = styled(Box)(({ theme, menulength, hide }) => ({
  display: hide ? 'none' : 'flex',
  borderColor: '#e0e0e0',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: '6px',
  left: menulength ? '207px' : '87px',
  borderStyle: 'dashed',
  borderRadius: '50%',
  height: '25px',
  width: '25px',
  backgroundColor: 'white',
  cursor: 'pointer',
}));

export default function SideBar({ open, toggleDrawer, hide }) {
  const [menuLength, setMenuLength] = useState(true);
  const location = useLocation();
  const context = useContext(AppContext);
  function getColorOfIcon(urlPath) {
    if (urlPath === location.pathname) {
      return '#00c853';
    } else {
      if (context.darkMode === 'light') {
        return '#757575';
      } else {
        return '#b0bec5';
      }
    }
  }

  return (
    <Grid1 sx={{ display: { xs: open, lg: 'flex' } }} menulength={+menuLength}>
      <Box1 hide={hide} onClick={() => setMenuLength(!menuLength)} menulength={+menuLength}>
        {menuLength ? (
          <ArrowBackIosIcon sx={{ fontSize: '12px', paddingLeft: '4px', color: '#757575' }} />
        ) : (
          <ArrowForwardIosIcon sx={{ fontSize: '12px', paddingLeft: '4px', color: '#757575' }} />
        )}
      </Box1>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', overflow: 'scroll' }}>
        {/* <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
          <Typography
            sx={{
              m: '3px 20px 5px 10px ',
              //   my: '3px'
              fontWeight: 700,
              //   height: '40px',
              //   p: '5px',
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'red',
              color: '#e0e0e0',
              borderRadius: '20px',
              textCon: 'center',
            }}
          >
            {menuLength ? 'BUY IT NOW' : 'BIN'}
          </Typography>
        </Link> */}
        <img style={{ width: '100%', height: 'auto' }} src={Image1} />
        <Typography
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          p="20px 0 5px 10px"
          fontSize="12px"
          minHeight="40px"
          color="primary"
        >
          {getText('cars', context.language, textSideBar)}
        </Typography>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            justifyContent: 'center',
            backgroundColor: location.pathname === '/copart-cars' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/copart-cars"
        >
          <CopartIcon length={menuLength ? '120px' : '60px'} />
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            justifyContent: 'center',
            backgroundColor: location.pathname === '/iaai-cars' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/iaai-cars"
        >
          <IAAIIcon length={menuLength ? '120px' : '60px'} />
        </Link>

        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/europe-cars' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/europe-cars"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <EuropeIcon />
          </Box>
          <Typography
            color={location.pathname === '/europe-cars' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/europe-cars' ? 500 : 400,
            }}
          >
            Europe
          </Typography>
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/on-road' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/on-road"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <CargoIcon
              color={
                context.darkMode === 'light' || location.pathname === '/on-road' ? '#34495c ' : '#84ffff'
              }
            />
          </Box>
          <Typography
            color={location.pathname === '/on-road' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/on-road' ? 500 : 400,
            }}
          >
            {getText('onRoad', context.language, textSideBar)}
          </Typography>
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/in-armenia' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/in-armenia"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <ArmFlag
              color={
                context.darkMode === 'light' || location.pathname === '/in-armenia' ? '#34495c ' : '#84ffff'
              }
            />
          </Box>
          <Typography
            color={location.pathname === '/in-armenia' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/in-armenia' ? 500 : 400,
            }}
          >
            {getText('inArmenia', context.language, textSideBar)}
          </Typography>
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/in-georgia' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/in-georgia"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <GeorgianFlag
              color={
                context.darkMode === 'light' || location.pathname === '/in-georgia' ? '#34495c ' : '#84ffff'
              }
            />
          </Box>
          <Typography
            color={location.pathname === '/in-georgia' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/in-georgia' ? 500 : 400,
            }}
          >
            {getText('inGeorgia', context.language, textSideBar)}
          </Typography>
        </Link>
        <Typography p="20px 0 5px 10px" fontSize="12px" color="primary">
          {getText('general', context.language, textSideBar)}
        </Typography>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor:
              location.pathname === '/' || location.pathname === '/truck-tyres' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <HomeOutlinedIcon
              sx={{
                fontSize: '30px',
                color:
                  location.pathname === '/' || location.pathname === '/truck-tyres'
                    ? 'greenCustome.main'
                    : 'neutral.main',
              }}
            />
          </Box>
          <Typography
            color={
              location.pathname === '/' || location.pathname === '/truck-tyres'
                ? 'greenCustome.main'
                : 'neutral.main'
            }
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/' || location.pathname === '/truck-tyres' ? 500 : 400,
            }}
          >
            {getText('home', context.language, textSideBar)}
          </Typography>
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/about' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/about"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <AboutIcon color={getColorOfIcon('/about')} />
          </Box>
          <Typography
            color={location.pathname === '/about' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/about' ? 500 : 400,
            }}
          >
            {getText('about', context.language, textSideBar)}
          </Typography>
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/customers' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/customers"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <UserIcon color={getColorOfIcon('/customers')} />
          </Box>
          <Typography
            color={location.pathname === '/customers' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/customers' ? 500 : 400,
            }}
          >
            {getText('customers', context.language, textSideBar)}
          </Typography>
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/news' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/news"
        >
          <div style={{ padding: '0 15px 0 15px' }}>
            <NewsIcon color={getColorOfIcon('/news')} />
          </div>
          <Typography
            color={location.pathname === '/news' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/news' ? 500 : 400,
            }}
          >
            {getText('news', context.language, textSideBar)}
          </Typography>
        </Link>
        <Link
          style={{
            flexDirection: menuLength ? 'row' : 'column',
            backgroundColor: location.pathname === '/partners' ? '#e8f5e9' : '',
          }}
          className="linko"
          to="/partners"
        >
          <Box sx={{ padding: '0 15px 0 15px', display: 'flex' }}>
            <PartnerIcon color={getColorOfIcon('/partners')} />
          </Box>
          <Typography
            color={location.pathname === '/partners' ? 'greenCustome.main' : 'neutral.main'}
            sx={{
              fontSize: menuLength ? '16px' : '10px',
              fontWeight: location.pathname === '/partners' ? 500 : 400,
            }}
          >
            {getText('partners', context.language, textSideBar)}
          </Typography>
        </Link>
      </Box>
    </Grid1>
  );
}
