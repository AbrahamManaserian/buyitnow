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
import CloseIcon from '@mui/icons-material/Close';

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
const odometers = [50000, 100000, 150000, 200000, 250000, 300000];

const names = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function Filter({
  cylindersType,
  damageTypes,
  navigate,
  driveTypes,
  colorTypes,
  close,
  highlightsType,
}) {
  const url = new URL(window.location.href);
  const location = useLocation();
  const [years, setYears] = useState(url.searchParams.get('years')?.split(',') || []);
  const [drive, setDrive] = useState(url.searchParams.get('drive')?.split(',') || []);
  const [colors, setColors] = useState(url.searchParams.get('color')?.split(',') || []);
  const [damage, setDamage] = useState(url.searchParams.get('damage')?.split(',') || []);
  const [cylinder, setCylinder] = useState(url.searchParams.get('cylinders')?.split(',') || []);
  const [highlights, setHighlights] = useState(url.searchParams.get('highlights')?.split(',') || []);
  const [odometer, setOdometer] = useState({
    from: url.searchParams.get('odometerfrom') || '',
    to: url.searchParams.get('odometerto') || '',
  });
  useEffect(() => {
    setYears(url.searchParams.get('years')?.split(',') || []);
    setDrive(url.searchParams.get('drive')?.split(',') || []);
    setColors(url.searchParams.get('color')?.split(',') || []);
    setDamage(url.searchParams.get('damage')?.split(',') || []);
    setCylinder(url.searchParams.get('cylinders')?.split(',') || []);
    setHighlights(url.searchParams.get('highlights')?.split(',') || []);
    setOdometer({
      from: url.searchParams.get('odometerfrom') || '',
      to: url.searchParams.get('odometerto') || '',
    });
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
    } else if (event.target.name === 'damage') {
      const {
        target: { value },
      } = event;
      setDamage(typeof value === 'string' ? value.split(',') : value);
      if (value[0]) {
        url.searchParams.set('damage', `${[typeof value === 'string' ? value.split(',') : value]}`);
      } else {
        url.searchParams.delete('damage');
      }
      navigate(`${url.search}`);
    } else if (event.target.name === 'cylinders') {
      const {
        target: { value },
      } = event;
      setCylinder(typeof value === 'string' ? value.split(',') : value);
      if (value[0]) {
        url.searchParams.set('cylinders', `${[typeof value === 'string' ? value.split(',') : value]}`);
      } else {
        url.searchParams.delete('cylinders');
      }
      navigate(`${url.search}`);
    } else if (event.target.name === 'Highlights') {
      const {
        target: { value },
      } = event;
      setHighlights(typeof value === 'string' ? value.split(',') : value);
      if (value[0]) {
        url.searchParams.set('highlights', `${[typeof value === 'string' ? value.split(',') : value]}`);
      } else {
        url.searchParams.delete('highlights');
      }
      navigate(`${url.search}`);
    } else if (event.target.name === 'odometerFrom') {
      setOdometer({ ...odometer, from: event.target.value });
      if (event.target.value) {
        url.searchParams.set('odometerfrom', event.target.value);
      } else {
        url.searchParams.delete('odometerfrom');
      }
      navigate(`${url.search}`);
    } else if (event.target.name === 'odometerTo') {
      setOdometer({ ...odometer, to: event.target.value });
      if (event.target.value) {
        url.searchParams.set('odometerto', event.target.value);
      } else {
        url.searchParams.delete('odometerto');
      }
      navigate(`${url.search}`);
    }
  };

  return (
    <Grid
      columnSpacing={1}
      item
      //   direction="column"
      alignContent="flex-start"
      container
      //   alignContent="flex-end"
      sx={{
        // maxWidth: '100%',
        // m: '10px',
        p: '15px',
        overflow: 'hidden',
      }}
    >
      <Grid item container justifyContent="space-between" xs={12}>
        <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Filters</Typography>
        <Typography
          onClick={() => {
            url.searchParams.delete('color');
            url.searchParams.delete('drive');
            url.searchParams.delete('years');
            url.searchParams.delete('damage');
            url.searchParams.delete('cylinders');
            url.searchParams.delete('highlights');
            url.searchParams.delete('odometerfrom');
            url.searchParams.delete('odometerto');
            navigate(`${url.search}`);
            setYears([]);
            setDrive([]);
            setColors([]);
            setDamage([]);
            setCylinder([]);
            setHighlights([]);
            setOdometer({ from: '', to: '' });
          }}
          color="primary"
          sx={{ fontSize: '14px', cursor: 'pointer' }}
        >
          RESET
        </Typography>
        {close && <CloseIcon onClick={close} sx={{ cursor: 'pointer' }} />}
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
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
                <ListItemText sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
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
                <ListItemText sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
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
                <ListItemText sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
          <InputLabel>Damage</InputLabel>
          <Select
            name="damage"
            multiple
            value={damage}
            onChange={handleChange}
            input={<OutlinedInput label="Damage" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {damageTypes?.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={damage.indexOf(name) > -1} />
                <ListItemText sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
          <InputLabel>Cylinders</InputLabel>
          <Select
            name="cylinders"
            multiple
            value={cylinder}
            onChange={handleChange}
            input={<OutlinedInput label="Cylinders" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {cylindersType?.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={cylinder.indexOf(name) > -1} />
                <ListItemText
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                  primary={name + ` (cylinder)`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
          <InputLabel>Highlights</InputLabel>
          <Select
            name="Highlights"
            multiple
            value={highlights}
            onChange={handleChange}
            input={<OutlinedInput label="Highlights" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {highlightsType?.map((name, index) => (
              <MenuItem key={index} value={name}>
                <Checkbox checked={highlights.indexOf(name) > -1} />
                <ListItemText sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
          <InputLabel>Odometer-from</InputLabel>
          <Select
            value={odometer.from}
            label="Odometer-from"
            name="odometerFrom"
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {odometers.map((name) => (
              <MenuItem key={name} value={name}>
                {/* <Checkbox checked={highlights.indexOf(name) > -1} /> */}
                <ListItemText sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={12}>
        <FormControl size="small" sx={{ width: '100%', mt: '15px' }}>
          <InputLabel>Odometer-to</InputLabel>
          <Select
            value={odometer.to}
            label="Odometer-to"
            name="odometerTo"
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {odometers.map((name) => (
              <MenuItem key={name} value={name}>
                {/* <Checkbox checked={highlights.indexOf(name) > -1} /> */}
                <ListItemText sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
