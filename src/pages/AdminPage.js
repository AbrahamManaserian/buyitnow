import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { AppContext } from '../App';

export function StateTextFields() {
  const [inputs, setInputs] = React.useState({
    size: 1.1,
    year: 2016,
    month: 1,
  });
  const sizes = [
    1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1,
    3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2,
    5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0,
  ];
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('size'));
  };
  const handleChange = (event) => {
    console.log(event.target);
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return (
    <Grid
      justifyContent="center"
      xs
      item
      container
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      //   autoComplete="off"
    >
      <TextField type="number" name="Price" label="Price" />
      <FormControl sx={{ maxWidth: '150px' }}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputs.year}
          label="Year"
          onChange={handleChange}
          name="year"
        >
          {years.map((item, index) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ maxWidth: '150px' }}>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputs.month}
          label="Month"
          onChange={handleChange}
          name="month"
        >
          {months.map((item, index) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ maxWidth: '100px' }} size="medium">
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputs.size}
          label="Age"
          onChange={handleChange}
          name="size"
        >
          {sizes.map((item, index) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        ok
      </Button>
    </Grid>
  );
}

export default function AdminPage() {
  const context = React.useContext(AppContext);
  return <div>{context.user ? <StateTextFields /> : null}</div>;
}
