import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function About() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        console.log(id);
        element.scrollIntoView(false);
      }
    }
  }, [pathname, hash, key]);

  return (
    <Grid item xs container direction="column">
      <Typography height="700px">About</Typography>
      <Typography id="projects" height="400px">
        projects
      </Typography>
      <Typography id="upcoming-projects" height="400px">
        upcoming-projects
      </Typography>
      <Typography id="services" height="400px">
        services
      </Typography>
    </Grid>
  );
}
