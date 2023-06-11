import { Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Image2 from '../images/Mercedes-Logo.svg.png';
import Image1 from '../images/logo12.png';

export function Copyright(props) {
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
      <img style={{ width: '20%', height: 'auto' }} src={Image2} />
      <Typography fontWeight={800} variant="h3" alignSelf="center">
        Coming soon
      </Typography>
    </Grid>
  );
}
