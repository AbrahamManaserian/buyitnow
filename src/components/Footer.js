import { Box, Grid, Typography, Link } from '@mui/material';
import { Copyright } from '../pages/HomePage';
import { Link as RouterLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { FacebookIcon, InstagramIcon, ViberIcon, WhatsappIcon } from '../SVGIcons';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

export default function Footer({ mode }) {
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
        <Link mb="7px" component={RouterLink} to="/about#projects">
          Projects
        </Link>
        <Link mb="7px" component={RouterLink} to="/about">
          About Us
        </Link>
        <Link mb="7px" component={RouterLink} to="/about#upcoming-projects">
          Upcoming Projects
        </Link>
        <Link mb="7px" component={RouterLink} to="/about#services">
          Services
        </Link>
      </Grid>
      <Grid p={1} item xs={6} sm={3} container direction="column">
        <Typography sx={{ fontWeight: 900, fontSize: 18, mb: '10px' }}> Help </Typography>
        <Link mb="7px" component={RouterLink} to="/help#find-vehicle">
          Find Vehicle
        </Link>
        <Link mb="7px" component={RouterLink} to="/help#calculate-clearance">
          Calculate Clearance
        </Link>
        <Link mb="7px" component={RouterLink} to="/help#calculate-shipment">
          Calculate Shipment
        </Link>
        <Link mb="7px" component={RouterLink} to="/alert">
          Get Alerts
        </Link>
        <Link mb="7px" component={RouterLink} to="/help#add-vehicle">
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
          <Link sx={{ pl: '10px', fontSize: '15px' }} href="mailto:info@buyitnow.am">
            info@buyitnow.am
          </Link>
          {/* <Typography sx={{ pl: '10px', fontSize: '15px' }}>info@buyitnow.am</Typography> */}
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center', mb: '10px' }}>
          <AddIcCallIcon />
          <Link sx={{ paddingLeft: '10px', fontSize: '15px' }} href="tel:+37477055777">
            +37477055777
          </Link>
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
