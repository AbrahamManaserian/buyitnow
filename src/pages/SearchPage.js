import {
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { Fragment, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { format } from 'date-fns';
import CarCard from '../components/CarCard';
import { AppContext } from '../App';
import { CarInputs } from '../components/CarInputs';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CopartCarPage from './CopartCarPage';
import Filter from '../components/Filter';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { SettingsIcon } from '../SVGIcons';

const sortTypes = ['Auction Date', 'Buy It Now', 'Year', 'Current Bid'];

export default function SearchPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState({ cars: [], name: '', lastUpdated: '' });
  const [cars, setCars] = useState({ cars: [], name: '', lastUpdated: '' });
  const [sortBy, setSortBy] = useState('Buy It Now');
  const [drawer, setDrawer] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const url = new URL(window.location.href);
  //   console.log(cars);
  const handleChangeSortBy = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === 'Year') {
      setFilteredCars({
        ...filteredCars,
        cars: filteredCars.cars.sort((p1, p2) => {
          return +p1.name.slice(1, 5) > +p2.name.slice(1, 5)
            ? 1
            : +p1.name.slice(1, 5) < +p2.name.slice(1, 5)
            ? -1
            : 0;
        }),
      });
      return;
    }
    if (e.target.value === 'Buy It Now') {
      setFilteredCars({
        ...filteredCars,
        cars: filteredCars.cars.sort((p1, p2) => {
          return +p1.buyNowNumber > +p2.buyNowNumber ? 1 : +p1.buyNowNumber < +p2.buyNowNumber ? -1 : 0;
        }),
      });
      return;
    }
    if (e.target.value === 'Auction Date') {
      setFilteredCars({
        ...filteredCars,
        cars: filteredCars.cars.sort((p1, p2) => {
          return +p1.auctionDate1 > +p2.auctionDate1 ? 1 : +p1.auctionDate1 < +p2.auctionDate1 ? -1 : 0;
        }),
      });
      return;
    }
    if (e.target.value === 'Current Bid') {
      setFilteredCars({
        ...filteredCars,
        cars: filteredCars.cars.sort((p1, p2) => {
          return +p1.currentBid.split(',').join('') > +p2.currentBid.split(',').join('')
            ? 1
            : +p1.currentBid.split(',').join('') < +p2.currentBid.split(',').join('')
            ? -1
            : 0;
        }),
      });
      return;
    }
  };

  useEffect(() => {
    // console.log(location.searchParams);
    async function getCars() {
      setCars({ cars: [], name: '', lastUpdated: '' });
      setFilteredCars({ cars: [], name: '', lastUpdated: '' });
      const docRef = doc(
        db,
        'cars',
        url.searchParams.get('auction'),
        url.searchParams.get('make'),
        url.searchParams.get('model')
      );

      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setCars({
          cars: Object.values(docSnap.data().data).sort((p1, p2) =>
            +p1.buyNowNumber > +p2.buyNowNumber ? 1 : +p1.buyNowNumber < +p2.buyNowNumber ? -1 : 0
          ),
          name: docSnap.data().name,
          lastUpdated: format(docSnap.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
        });
      } else {
        setFilteredCars({ cars: ['none'], name: '', lastUpdated: '' });
      }
      setSortBy('Buy It Now');
    }
    getCars();
  }, [searchParams.get('make'), searchParams.get('model')]);
  useEffect(() => {
    if (cars.cars[0]) {
      let obj = { ...cars };
      if (searchParams.get('years')) {
        obj = {
          ...cars,
          cars: cars.cars.filter((item) => searchParams.get('years')?.includes(item.name.slice(1, 5))),
        };
      }
      if (searchParams.get('drive')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('drive')?.includes(item.detail.drive)),
        };
      }
      if (searchParams.get('color')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('color')?.includes(item.detail.color)),
        };
      }
      if (searchParams.get('damage')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('damage')?.includes(item.damage)),
        };
      }
      if (searchParams.get('cylinders')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('cylinders')?.includes(item.detail.cylinders)),
        };
      }
      if (searchParams.get('highlights')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('highlights')?.includes(item.condition)),
        };
      }
      if (searchParams.get('odometerfrom')) {
        obj = {
          ...obj,
          cars: obj.cars.filter(
            (item) => +item.odometer.slice(0, item.odometer.indexOf('(')) > +searchParams.get('odometerfrom')
          ),
        };
      }
      if (searchParams.get('odometerto')) {
        obj = {
          ...obj,
          cars: obj.cars.filter(
            (item) => +item.odometer.slice(0, item.odometer.indexOf('(')) < +searchParams.get('odometerto')
          ),
        };
      }
      if (obj.cars[0]) {
        setFilteredCars(obj);
      } else {
        setFilteredCars({ ...obj, cars: ['none'] });
      }
    } else {
      setFilteredCars({ cars: [], name: '', lastUpdated: '' });
    }
    // console.log(obj);
  }, [location, cars]);

  //   console.log(+filteredCars?.cars[0]?.odometer.slice(0, filteredCars?.cars[0]?.odometer?.indexOf('(')) + 99);
  return (
    <Grid item container xs={12}>
      <Grid item xs container>
        {!url.searchParams.get('lot') ? (
          <Grid item xs={12} container>
            <CarInputs auction="copart" />

            <LinearProgress
              sx={{
                width: '100%',
                mx: { xs: '8px', sm: '25px' },
                visibility: filteredCars.cars[0] ? 'hidden' : '',
              }}
              color="primary"
            />

            <Grid
              xs
              item
              container
              direction="row"
              m="10px"
              sx={{ p: { xs: '0 0 0 0', sm: '0 0 0 30px' }, justifyContent: 'center' }}
            >
              <Box
                onClick={() => setDrawer(true)}
                sx={{
                  pr: { xs: 0, sm: '23px' },
                  position: 'absolute',
                  right: '12px',
                  top: '180px',
                  cursor: 'pointer',
                  display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
                }}
              >
                Filters <SettingsIcon />
              </Box>
              {filteredCars.cars[0] && filteredCars.cars[0] !== 'none' && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '95%',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      borderBottom: 0.1,
                      pt: { xs: 0, sm: '24px' },
                      pb: '5px',
                    }}
                  >
                    <Typography
                      color="primary"
                      sx={{
                        // width: '100%',
                        // my: '15px',
                        // borderBottom: 0.1,
                        fontSize: '16px',
                        fontWeight: 600,
                      }}
                    >
                      {filteredCars.name} - {filteredCars.cars.length} items - {filteredCars.lastUpdated}
                    </Typography>
                    <FormControl
                      sx={{ m: { xs: '8px 0  0 9px', sm: '0 0  0 8px' }, width: '200px', pb: '5px' }}
                      size="small"
                    >
                      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                      <Select value={sortBy} label="Sort By" onChange={(e) => handleChangeSortBy(e)}>
                        {sortTypes.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  {filteredCars.cars.map((item, index) => {
                    return (
                      <CarCard
                        key={item.lot}
                        url={`${location.search}&`}
                        lot={item.lot}
                        auctionDate={item.auctionDate1}
                        href={item.href}
                        price={item.currentBid}
                        mode={context.darkMode}
                        name={item.name}
                        image={item.img}
                        highlights={item.condition}
                        damage={item.damage}
                        // actual={cars[item].damage}
                        odometer={item.odometer}
                        buyNow={item.buyNow}
                      />
                    );
                  })}
                </>
              )}
              {filteredCars.cars[0] === 'none' && 'No Items'}
            </Grid>
            <Drawer anchor="bottom" open={drawer} onClose={() => setDrawer(false)}>
              <Box
                // onClick={() => setDrawer(false)}
                onKeyDown={() => setDrawer(false)}
                sx={{ display: 'flex', justifyContent: 'flex-end', height: '100vh' }}
              >
                <Filter
                  navigate={navigate}
                  close={() => setDrawer(false)}
                  driveTypes={cars.cars
                    .map((item) => item.detail.drive)
                    .filter(
                      (value, index) => cars.cars.map((item) => item.detail.drive).indexOf(value) === index
                    )}
                  colorTypes={cars.cars
                    .map((item) => item.detail.color)
                    .filter(
                      (value, index) => cars.cars.map((item) => item.detail.color).indexOf(value) === index
                    )}
                  damageTypes={cars.cars
                    .map((item) => item.damage)
                    .filter((value, index) => cars.cars.map((item) => item.damage).indexOf(value) === index)}
                  cylindersType={cars.cars
                    .map((item) => item.detail.cylinders)
                    .filter(
                      (value, index) =>
                        cars.cars.map((item) => item.detail.cylinders).indexOf(value) === index
                    )}
                />
              </Box>
            </Drawer>
            <Grid
              item
              container
              sx={{
                maxWidth: { xs: '100%', sm: '220px' },
                display: { xs: 'none', lg: 'flex' },
                m: '10px',
              }}
            >
              <Filter
                navigate={navigate}
                driveTypes={cars.cars
                  .map((item) => item.detail.drive)
                  .filter(
                    (value, index) => cars.cars.map((item) => item.detail.drive).indexOf(value) === index
                  )}
                colorTypes={cars.cars
                  .map((item) => item.detail.color)
                  .filter(
                    (value, index) => cars.cars.map((item) => item.detail.color).indexOf(value) === index
                  )}
                damageTypes={cars.cars
                  .map((item) => item.damage)
                  .filter((value, index) => cars.cars.map((item) => item.damage).indexOf(value) === index)}
                highlightsType={cars.cars
                  .map((item) => item.condition)
                  .filter((value, index) => cars.cars.map((item) => item.condition).indexOf(value) === index)}
                cylindersType={cars.cars
                  .map((item) => item.detail.cylinders)
                  .filter(
                    (value, index) => cars.cars.map((item) => item.detail.cylinders).indexOf(value) === index
                  )}
              />
            </Grid>
          </Grid>
        ) : (
          <CopartCarPage carItems={cars.cars} />
        )}
      </Grid>
    </Grid>
  );
}
