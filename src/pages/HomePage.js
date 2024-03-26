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
      <img
        // style="border:0"
        src="https://affiliate.epicvin.com/scripts/014iuuh?a_aid=0rg1m775c70e2&amp;a_bid=11110002"
        width="1"
        height="1"
        alt=""
      />
      <img style={{ width: '20%', height: 'auto' }} src={Image2} />
      <Typography fontWeight={800} sx={{ fontSize: { sm: '48px', xs: '38px' } }} alignSelf="center">
        Coming soon
      </Typography>
    </Grid>
  );
}
