import { Box, Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../App';
import CarCard from '../components/CarCard';
import { CopartIcon } from '../SVGIcons';
import Image1 from '../images/merc1.jpeg';
import Image2 from '../images/merc2.jpeg';
import Image3 from '../images/merc3.jpeg';
import Image4 from '../images/merc4.jpeg';
import Image5 from '../images/merc5.jpeg';
import Image6 from '../images/merc6.jpeg';
import { getText } from '../texts';
import { textCopartCars } from '../texts';
import { Link } from 'react-router-dom';

const data = [
  {
    name: '2020 MERCEDES-BENZ A 220',
    image: Image1,
    price: '13500',
    odometer: '0',
    actual: 'NOT ACTUAL',
    damage: 'Water/Flood',
    highlights: 'Enhanced Vehicles',
  },
  {
    name: '2018 MERCEDES-BENZ S 560 4MATIC',
    image: Image2,
    price: '17900',
    odometer: '0',
    actual: 'NOT ACTUAL',
    damage: 'Water/Flood',
    highlights: 'Enhanced Vehicles',
  },
  {
    name: '2019 MERCEDES-BENZ CLA 250',
    image: Image3,
    price: '12500',
    odometer: '0',
    actual: 'NOT ACTUAL',
    damage: 'Front End',
    highlights: 'Enhanced Vehicles',
  },
  {
    name: '2018 MERCEDES-BENZ GLA 250 4MATIC',
    image: Image4,
    price: '13000',
    odometer: '53216',
    actual: 'ACTUAL',
    damage: 'Front End',
    highlights: 'Run and Drive',
  },
  {
    name: '2021 MERCEDES-BENZ GLE COUPE AMG 53 4MATIC',
    image: Image5,
    price: '81500',
    odometer: '36570',
    actual: 'ACTUAL',
    damage: 'Normal Wear',
    highlights: 'Run and Drive',
  },
  {
    name: '2019 MERCEDES-BENZ GLC 350E',
    image: Image6,
    price: '17000',
    odometer: '0',
    actual: 'Not ACTUAL',
    damage: 'Front End',
    highlights: 'Run and Drive',
  },
];

export default function CopartCars() {
  const context = useContext(AppContext);
  console.log(context);
  return (
    <Grid item xs={12} container>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 2 }}>
        <CopartIcon />
      </Box>
      <Box
        color="primary"
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: 0.1,
          ml: 1,
          color: context.darkMode !== 'dark' ? '#1565c0' : '#42a5f5',
        }}
      >
        <Typography marginLeft="10px">{getText('cars', context.language, textCopartCars)} -</Typography>
        <Link
          to="/asd"
          style={{
            textDecoration: 'none',
            padding: '0 5px 0 5px',
            color: 'inherit',

            marginLeft: '5px',
          }}
        >
          Buy it now
        </Link>
      </Box>
      <Grid
        item
        container
        direction="row"
        m="10px"
        sx={{ p: { xs: '0 0 0 0', sm: '0 0 0 30px' }, justifyContent: 'center' }}
      >
        {data.map((item, index) => {
          return (
            <CarCard
              key={index}
              price={item.price}
              mode={context.darkMode}
              name={item.name}
              image={item.image}
              highlights={item.highlights}
              damage={item.damage}
              actual={item.actual}
              odometer={item.odometer}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
