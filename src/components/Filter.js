import { Grid, Typography } from '@mui/material';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const names = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function Filter({ years1, setYears1, navigate, driveTypes, colorTypes }) {
  const url = new URL(window.location.href);
  const location = useLocation();
  const [years, setYears] = useState(url.searchParams.get('years')?.split(',') || []);
  const [drive, setDrive] = useState(url.searchParams.get('drive')?.split(',') || []);
  const [colors, setColors] = useState(url.searchParams.get('color')?.split(',') || []);
  useEffect(() => {
    setYears(url.searchParams.get('years')?.split(',') || []);
    setDrive(url.searchParams.get('drive')?.split(',') || []);
    setColors(url.searchParams.get('color')?.split(',') || []);
  }, [location.search]);
  const handleChange = (event) => {
    if (event.target.name === 'year') {
      const {
        target: { value },
      } = event;
      console.log(Boolean(value[0]));
      setYears(typeof value === 'string' ? value.split(',') : value);
      if (value[0]) {
        url.searchParams.set('years', `${[typeof value === 'string' ? value.split(',') : value]}`);
      } else {
        url.searchParams.delete('years');
      }
      navigate(`${url.search}`);
    } else if (event.target.name === 'drive') {
      const {
        target: { value },
      } = event;
      setDrive(typeof value === 'string' ? value.split(',') : value);
      if (value[0]) {
        url.searchParams.set('drive', `${[typeof value === 'string' ? value.split(',') : value]}`);
      } else {
        url.searchParams.delete('drive');
      }
      navigate(`${url.search}`);
    } else if (event.target.name === 'color') {
      const {
        target: { value },
      } = event;
      setColors(typeof value === 'string' ? value.split(',') : value);
      if (value[0]) {
        url.searchParams.set('color', `${[typeof value === 'string' ? value.split(',') : value]}`);
      } else {
        url.searchParams.delete('color');
      }
      navigate(`${url.search}`);
    }
  };

  return (
    <Grid
      item
      direction="column"
      container
      sx={{
        maxWidth: { xs: '100%', sm: '220px' },
        m: '10px',
        // p: '10px',
        overflow: 'hidden',
      }}
    >
      <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Filters</Typography>
      <div>
        <FormControl size="small" sx={{ width: '200px', mt: '15px' }}>
          <InputLabel>Year</InputLabel>
          <Select
            multiple
            name="year"
            value={years}
            onChange={handleChange}
            input={<OutlinedInput label="Year" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={years.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl size="small" sx={{ width: '200px', mt: '15px' }}>
          <InputLabel>Drive</InputLabel>
          <Select
            name="drive"
            multiple
            value={drive}
            onChange={handleChange}
            input={<OutlinedInput label="Year" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {driveTypes?.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={drive.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl size="small" sx={{ width: '200px', mt: '15px' }}>
          <InputLabel>Color</InputLabel>
          <Select
            name="color"
            multiple
            value={colors}
            onChange={handleChange}
            input={<OutlinedInput label="Color" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {colorTypes?.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={colors.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Grid>
  );
}
