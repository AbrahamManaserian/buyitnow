import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  // console.log(makes[inputs.make]);
  return (
    <Grid columnSpacing={1} item xs container sx={{ m: 5, '& button': { m: 1 } }}>
      <FormControl sx={{ width: { xs: '50%', sm: '220px' }, m: 1 }} size="small">
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
        sx={{ width: { xs: '50%', sm: '220px' }, m: 1 }}
        size="small"
      >
        <InputLabel>Model</InputLabel>
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
        sx={{ textTransform: 'capitalize' }}
        size="small"
        variant="contained"
      >
        Search
      </Button>
    </Grid>
  );
}
