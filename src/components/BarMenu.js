import { Box, Button, Grid } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { barText } from '../texts';
import { getText } from '../texts';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Logo from '../images/logo1.png';

export default function BarMenu() {
  const context = useContext(AppContext);
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
      <img src={Logo} style={{ maxWidth: '100px', height: 'auto' }} />
      <Link className="linko" to="/">
        {getText('home', context.language, barText)}
      </Link>

      <Link className="linko" to="/about">
        about
      </Link>
      <div style={{ cursor: 'pointer' }} onClick={handleCLickDarkMode}>
        {context.darkMode === 'dark' ? (
          <LightModeOutlinedIcon sx={{ color: 'greenCustome.main' }} />
        ) : (
          <DarkModeOutlinedIcon color="success" />
        )}
      </div>
    </Grid>
  );
}
