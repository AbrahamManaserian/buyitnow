import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function HelpPage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView(false);
      }
    }
  }, [hash]);
  return (
    <Grid item xs container direction="column">
      <Typography id="find-vehicle" height="700px">
        find-vehicle
      </Typography>
      <Typography id="calculate-clearance" height="700px">
        calculate-clearance
      </Typography>
      <Typography id="calculate-shipment" height="700px">
        calculate-shipment
      </Typography>
      <Typography id="get-alerts" height="700px">
        get-alerts
      </Typography>
      <Typography id="add-vehicle" height="700px">
        add-vehicle
      </Typography>
      Help Page
    </Grid>
  );
}
