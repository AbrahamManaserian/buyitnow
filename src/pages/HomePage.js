import { Button, Grid, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
import { AppContext } from '../App';
import Image1 from '../images/33.jpeg';
import Image2 from '../images/Mercedes-Logo.svg.png';
import Todos from './Todos';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://buyitnow.am/">
        www.buyitnow.am
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function HomePage() {
  const context = useContext(AppContext);

  return (
    <Grid
      item
      xs={12}
      padding="40px"
      container
      direction="column"
      // alignContent="flex-end"
      alignItems="center"
    >
      <img style={{ width: '30%', height: 'auto' }} src={Image2} />
      <Typography fontWeight={800} variant="h3" alignSelf="center">
        Coming soon
      </Typography>
      <Typography fontWeight={700} variant="h6" alignSelf="center" textAlign="center">
        Buy your car with us and we will choose the best offers for you
      </Typography>
      <Copyright sx={{ mt: 8 }} />
      <Typography color="text.secondary" variant="body2">
        Phones: - <Link href="tel:+37477055777">+37477055777</Link>
      </Typography>
      <Typography paddingLeft="54px" color="text.secondary" variant="body2">
        - <Link href="tel:+37477577348">+37477577348</Link>
      </Typography>
    </Grid>
  );
}
