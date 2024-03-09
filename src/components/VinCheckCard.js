import { Box, Grid, Paper, Typography } from '@mui/material';
import { EpicVinIcon } from '../SVGIcons';
import { Link } from 'react-router-dom';

export default function VinCheckCard() {
  return (
    <Grid
      sx={{
        mt: 2,
        '& > :not(style)': {
          width: '100%',
          overflow: 'hidden',
          //   p: 1,
        },
      }}
      item
      container
      xs={12}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            display: 'flex',
            borderRadius: '3px 3px 0 0',
            width: '100%',
            bgcolor: 'success.main',
            p: '8px',
          }}
        >
          <Typography sx={{ fontWeight: 700, color: 'white' }}>Vehicle history reports</Typography>
        </Box>
        <Grid item container xs={12} p="8px">
          <Grid
            borderRight={0.1}
            p="10px"
            item
            container
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignContent="center"
          >
            <Typography
              sx={{ width: '100%', fontSize: { xs: '11px', sm: '14px' }, textAlign: 'justify', pb: '5px' }}
            >
              Get access to Copart vehicle history reports so you know what to expect before you buy! EpicVin
              will provide you with Vehicle History Reports you can trust - helping you make a confident
              buying decision
            </Typography>
            <EpicVinIcon />
            <Link style={{ fontSize: '14px', marginLeft: '4px' }} to="asd">
              EpicVin Report
            </Link>
          </Grid>
          <Grid p="10px" item container xs={12} sm={6} justifyContent="flex-start" alignContent="center">
            <Typography
              sx={{ width: '100%', fontSize: { xs: '11px', sm: '14px' }, textAlign: 'justify', pb: '5px' }}
            >
              Get access to Copart vehicle history reports so you know what to expect before you buy! EpicVin
              will provide you with Vehicle History Reports you can trust - helping you make a confident
              buying decision
            </Typography>
            <EpicVinIcon />
            <Link style={{ fontSize: '14px', marginLeft: '4px' }} to="asd">
              EpicVin Report
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
