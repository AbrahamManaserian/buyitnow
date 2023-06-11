import { Box, Grid, Typography } from '@mui/material';
import { Copyright } from '../pages/HomePage';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { FacebookIcon, InstagramIcon, ViberIcon, WhatsappIcon } from '../SVGIcons';

export default function Footer({ mode }) {
  const styleLink = { marginBottom: '7px', color: mode === 'dark' ? '#9fa8da' : '#3949ab' };
  return (
    <Grid p="30px 10px 30px 10px" container item xs={12}>
      <Grid p={1} pr={5} item xs={12} sm={3} container direction="column">
        <Typography sx={{ fontWeight: 900, fontSize: 18, mb: '10px' }}> www.buyitnow.am </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
          quam beatae rerum inventore consectetur, neque doloribus
        </Typography>
      </Grid>
      <Grid p={1} item xs={6} sm={3} container direction="column">
        <Typography sx={{ fontWeight: 900, fontSize: 18, mb: '10px' }}> About </Typography>
        <Link style={styleLink} to="">
          Projects
        </Link>
        <Link style={styleLink} to="">
          About Us
        </Link>
        <Link style={styleLink} to="">
          Upcoming Projects
        </Link>
        <Link style={styleLink} to="">
          Services
        </Link>
      </Grid>
      <Grid p={1} item xs={6} sm={3} container direction="column">
        <Typography sx={{ fontWeight: 900, fontSize: 18, mb: '10px' }}> Help </Typography>
        <Link style={styleLink} to="">
          Find Vehicle
        </Link>
        <Link style={styleLink} to="">
          Calculate Clearance
        </Link>
        <Link style={styleLink} to="">
          Calculate Shipment
        </Link>
        <Link style={styleLink} to="">
          Get Alerts
        </Link>
        <Link style={styleLink} to="">
          Add Vehicle
        </Link>
      </Grid>
      <Grid p={1} item xs={12} sm={3} container direction="column">
        <Typography sx={{ fontWeight: 900, fontSize: 18, mb: '10px' }}> Adress </Typography>
        <Box sx={{ display: 'flex', alignContent: 'center', mb: '10px' }}>
          <HomeOutlinedIcon />
          <Typography sx={{ pl: '10px', fontSize: '15px' }}>Armenia,YR Mashtots 2/12</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center', mb: '10px' }}>
          <MailOutlinedIcon />
          <Typography sx={{ pl: '10px', fontSize: '15px' }}>info@buyitnow.am</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center', mb: '10px' }}>
          <MailOutlinedIcon />
          <Typography sx={{ pl: '10px', fontSize: '15px' }}>+374-77-055-777</Typography>
        </Box>
      </Grid>
      <Grid pt={3} item container xs={12} justifyContent="center">
        <a target="_blank" style={{ marginRight: '15px' }} href="https://www.instagram.com/buyitnow_armenia/">
          <InstagramIcon />
        </a>
        <a target="_blank" style={{ marginRight: '15px' }} href="https://www.facebook.com/">
          <FacebookIcon />
        </a>

        <a
          style={{ marginRight: '15px' }}
          target="_blank"
          aria-label="Chat on WhatsApp"
          href="https://wa.me/37477055777"
        >
          <WhatsappIcon />
        </a>

        <a target="_blank" style={{ marginRight: '15px' }} href="viber://chat/?number=37477055777">
          <ViberIcon />
        </a>
      </Grid>
      <Grid pt={3} item container xs={12} justifyContent="center">
        <Copyright />
      </Grid>
    </Grid>
  );
}

// sx={{ bgcolor: '#00897b' }}
