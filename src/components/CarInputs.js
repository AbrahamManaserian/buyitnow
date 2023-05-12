import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CopartIcon } from '../SVGIcons';
import { getText, textCopartCars } from '../texts';
import { AppContext } from '../App';

const makes = {
  Mercedes: {
    name: 'Mercedes-Benz',
    models: [
      {
        name: 'E-Class',
        fetchName: 'EBuyNow',
      },
      {
        name: 'C-Class',
        fetchName: 'CBuyNow',
      },
      {
        name: 'CLA-Class',
        fetchName: 'ClaBuyNow',
      },
      {
        name: 'G-Class',
        fetchName: 'GBuyNow',
      },
      {
        name: 'GLE-Class',
        fetchName: 'GleBuyNow',
      },
      {
        name: 'S-Class',
        fetchName: 'SBuyNow',
      },
    ],
  },
  Nissan: {
    name: 'Nissan',
    models: [
      {
        name: 'Rogue',
        fetchName: 'RogueBuyNow',
      },
      {
        name: 'Rogue Sport',
        fetchName: 'RogueSportBuyNow',
      },
    ],
  },
  Jeep: {
    name: 'Jeep',
    models: [
      {
        name: 'Compass',
        fetchName: 'Compass',
      },
      //   {
      //     name: 'Rogue Sport',
      //     fetchName: 'RogueSportBuyNow',
      //   },
    ],
  },
};

export function CarInputs({ auction, make, model }) {
  const url = new URL(window.location.href);
  const navigate = useNavigate();
  const handleClickSearch = (url) => {
    navigate(`/search?auction=${auction}&${url}`);
  };
  const [inputs, setInputs] = useState({
    make: url.searchParams.get('make') || '',
    model: url.searchParams.get('model') || '',
  });

  const handleChange = (event) => {
    if (event.target.name === 'make') {
      setInputs({ [event.target.name]: event.target.value, model: '' });
      return;
    }
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const context = useContext(AppContext);
  // console.log(makes[inputs.make]);
  return (
    <Grid item xs={12} container sx={{ m: 1, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pb: 2 }}>
        <CopartIcon />
        <Typography sx={{ fontSize: '17px' }} marginLeft="10px">
          {getText('cars', context.language, textCopartCars)} - Buy it now
        </Typography>
      </Box>
      <Grid item container ml={{ xs: 0, sm: 4 }} mt={2} xs={12}>
        <FormControl sx={{ width: { xs: '50%', sm: '220px' }, pr: '4px' }} size="small">
          <InputLabel>Make</InputLabel>
          <Select name="make" value={inputs.make} label="Make" onChange={handleChange}>
            {Object.keys(makes).map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {makes[item].name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          disabled={!inputs.make ? true : false}
          sx={{ width: { xs: '50%', sm: '220px' }, pl: '4px' }}
          size="small"
        >
          <InputLabel sx={{ px: '4px' }}>Model</InputLabel>
          <Select
            name="model"
            // id="demo-simple-select"
            value={inputs.model}
            label="Model"
            onChange={handleChange}
          >
            {makes[inputs.make]?.models.map((item, index) => {
              return (
                <MenuItem key={index} value={item.fetchName}>
                  {item.name}{' '}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          onClick={() => handleClickSearch(`make=${inputs.make}&model=${inputs.model}`)}
          sx={{ textTransform: 'capitalize', m: { xs: '8px 0  0 0', sm: '0 0  0 8px' }, px: '25px' }}
          size="small"
          variant="contained"
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
