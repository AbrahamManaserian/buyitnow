import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { AppContext } from '../App';

const feeStart = [
  49, 99, 199, 299, 349, 399, 449, 499, 549, 599, 699, 799, 899, 999, 1199, 1299, 1399, 1499, 1599, 1699,
  1799, 1999, 2399, 2499, 2999, 3499, 3999, 4499, 4999, 5999, 7499, 9999, 14999, 19999, 24999, 29999, 34999,
  10000000,
];

const feeResult = [
  1,
  1,
  25,
  50,
  75,
  75,
  110,
  110,
  125,
  130,
  140,
  155,
  170,
  185,
  200,
  225,
  240,
  250,
  260,
  275,
  285,
  300,
  325,
  335,
  350,
  400,
  450,
  575,
  600,
  625,
  650,
  675,
  700,
  '5.50%',
  '5.50%',
  '5.50%',
  '5.50%',
  '5.50%',
];

const internetStart = [99, 499, 999, 1499, 1999, 3999, 5999, 7999, 10000000];

const internetResult = [0, 39, 49, 69, 79, 89, 99, 119, 129];

export function StateTextFields() {
  const [result, setResult] = React.useState({
    AAH: '',
    max: '',
    nature: '',
    total: '',
    total$: '',
  });
  const [inputs, setInputs] = React.useState({
    size: '',
    year: '',
    month: '',
    fob: '',
    fobCar: '',
    total: '',
    ship: '',
    change: 1.092,
  });
  const sizes = [
    0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7,
    2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8,
    4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0,
  ];
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nature =
      new Date().getFullYear() - +data.get('year') > 4
        ? Math.round((inputs.total / inputs.change) * 0.02)
        : 0;
    // console.log(new Date().getFullYear() - 3 <= +data.get('year'));
    if (new Date().getFullYear() - 3 <= +data.get('year')) {
      let clearance = 0;
      if (+data.get('size') < 2.9) {
        // clearance = ((inputs.total / 1.092) * 0.15 + inputs.total / 1.092) * 0.2
        clearance =
          ((+inputs.total / data.get('change')) * 0.15 + +inputs.total / data.get('change')) * 0.2 +
          (+inputs.total / data.get('change')) * 0.15;
        setResult({
          AAH: Math.round(
            ((+inputs.total / data.get('change')) * 0.15 + +inputs.total / data.get('change')) * 0.2
          ),
          max: Math.round((+inputs.total / data.get('change')) * 0.15),
          nature: 0,
          total: Math.round(clearance),
          total$: Math.round(clearance * inputs.change),
        });
      } else {
        clearance =
          ((+inputs.total / data.get('change')) * 0.125 + +inputs.total / data.get('change')) * 0.2 +
          (+inputs.total / data.get('change')) * 0.125;
        setResult({
          AAH: Math.round(
            ((+inputs.total / data.get('change')) * 0.125 + +inputs.total / data.get('change')) * 0.2
          ),
          max: Math.round((+inputs.total / data.get('change')) * 0.125),
          nature: 0,
          total: Math.round(clearance),
          total$: Math.round(clearance * inputs.change),
        });
      }
    } else {
      if (+data.get('size') <= 1 || (+data.get('size') > 1.5 && +data.get('size') <= 1.8)) {
        const max = Math.round(
          +data.get('size') * 0.36 * 1000 < (+inputs.total / inputs.change) * 0.2
            ? (+inputs.total / inputs.change) * 0.2
            : +data.get('size') * 0.36 * 1000
        );
        const AAH = Math.round((max + +inputs.total / data.get('change')) * 0.2);

        setResult({
          max: max,
          AAH: AAH,
          nature: nature,
          total: max + AAH + nature,
          total$: Math.round((max + AAH + nature) * inputs.change),
        });
      } else if (+data.get('size') > 1 && +data.get('size') <= 1.5) {
        const max = Math.round(
          +data.get('size') * 0.4 * 1000 < (+inputs.total / inputs.change) * 0.2
            ? (+inputs.total / inputs.change) * 0.2
            : +data.get('size') * 0.4 * 1000
        );
        const AAH = Math.round((max + +inputs.total / data.get('change')) * 0.2);

        setResult({
          max: max,
          AAH: AAH,
          nature: nature,
          total: max + AAH + nature,
          total$: Math.round((max + AAH + nature) * inputs.change),
        });
      } else if (+data.get('size') > 1.8 && +data.get('size') <= 3) {
        const max = Math.round(
          +data.get('size') * 0.44 * 1000 < (+inputs.total / inputs.change) * 0.2
            ? (+inputs.total / inputs.change) * 0.2
            : +data.get('size') * 0.44 * 1000
        );
        const AAH = Math.round((max + +inputs.total / data.get('change')) * 0.2);
        setResult({
          max: max,
          AAH: AAH,
          nature: nature,
          total: max + AAH + nature,
          total$: Math.round((max + AAH + nature) * inputs.change),
        });
      } else {
        const max = Math.round(
          +data.get('size') * 0.8 * 1000 < (+inputs.total / inputs.change) * 0.2
            ? (+inputs.total / inputs.change) * 0.2
            : +data.get('size') * 0.8 * 1000
        );
        const AAH = Math.round((max + +inputs.total / data.get('change')) * 0.2);

        setResult({
          max: max,
          AAH: AAH,
          nature: nature,
          total: max + AAH + nature,
          total$: Math.round((max + AAH + nature) * inputs.change),
        });
      }
    }
  };
  const handleChange = (event) => {
    if (event.target.name === 'price') {
      if (event.target.value >= 15000) {
        const fob = (event.target.value * 5.5) / 100 + 129 + 79;
        const total = +event.target.value + fob + +inputs.ship;
        setInputs({
          ...inputs,
          [event.target.name]: event.target.value,
          fob: fob,
          fobCar: +event.target.value + fob,
          total: total,
        });
        return;
      }
      const fob =
        feeResult[feeStart.indexOf(feeStart.find((item, index) => item >= event.target.value))] +
        internetResult[
          internetStart.indexOf(internetStart.find((item, index) => item >= event.target.value))
        ] +
        79;
      const total = +event.target.value + fob + +inputs.ship;
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
        fob: fob,
        fobCar: +event.target.value + fob,
        total: total,
      });
      return;
    } else if (event.target.name === 'ship') {
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,

        total: +inputs.fobCar + +event.target.value,
      });
      return;
    }
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return (
    <Grid item xs container>
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
        <FormControl onChange={handleChange} sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <TextField size="small" value={inputs.change} type="number" name="change" label="EUR/USD" />
        </FormControl>
        <FormControl onChange={handleChange} sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <TextField size="small" type="number" name="price" label="Car rice $" />
        </FormControl>
        <FormControl sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <TextField size="small" type="number" value={inputs.fob} name="fob" label="Fob $" />
        </FormControl>
        <FormControl sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <TextField size="small" type="number" value={inputs.fobCar} name="fobCar" label="Car+fob $" />
        </FormControl>
        <FormControl onChange={handleChange} sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <TextField size="small" type="number" name="ship" label="ship $" />
        </FormControl>
        <FormControl sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <TextField size="small" type="number" value={inputs.total} name="total" label="Total $" />
        </FormControl>
        <FormControl sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <InputLabel id="demo-simple-select-label1">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label3"
            id="demo-simple-select"
            value={inputs.year}
            label="Year"
            onChange={handleChange}
            name="year"
            size="small"
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
        <FormControl sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputs.month}
            label="Month"
            onChange={handleChange}
            name="month"
            size="small"
          >
            {months.map((item, index) => {
              return (
                <MenuItem key={item} value={item}>
                  {item < 10 ? '0' : ''}
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: { xs: '45%', sm: '10%' } }}>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputs.size}
            label="Age"
            onChange={handleChange}
            name="size"
            size="small"
          >
            {sizes.map((item, index) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                  {Number.isInteger(item) ? '.000' : '00'}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ maxWidth: { xs: '45%', sm: '10%' }, mt: 3, mb: 2 }}
        >
          Calculate
        </Button>
      </Grid>
      <Grid padding={2} item xs={12} container alignContent="flex-end" direction="column">
        <Box sx={{ display: 'flex' }}>
          <Typography p={1}>Մաքսատուրք՝ -</Typography>
          <Typography p={1}>{result.max} EUR </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography p={1}>ԱԱՀ՝ -</Typography>
          <Typography p={1}>{result.AAH} EUR </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography p={1}>Բնապահպանական հարկ՝ - </Typography>
          <Typography p={1}>{result.nature} EUR </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography p={1}>Ընդհանուր - </Typography>
          <Typography p={1}>{result.total} EUR </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography p={1}>Ընդհանուր USD -</Typography>
          <Typography p={1}>{result.total$} USD</Typography>
        </Box>
        <Box sx={{ display: 'flex', border: 0.1 }}>
          <Typography fontWeight={800} p={1}>
            Ընդ. մեքենա/մաքս -
          </Typography>
          <Typography fontWeight={800} p={1}>
            {result.total$ + inputs.total} USD
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default function AdminPage() {
  const context = React.useContext(AppContext);
  return <div>{context.user ? <StateTextFields /> : null}</div>;
}
