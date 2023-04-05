import { Grid } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Grid
      direction="column"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      item
      container
      xs={12}
      height="100vh"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Grid>
  );
}
