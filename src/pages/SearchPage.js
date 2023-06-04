import {
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
import { checkDate } from '../dataReaderWriterFunctions/Accord';

const sortTypes = ['Auction Date', 'Buy It Now', 'Year', 'Current Bid'];

export default function SearchPage() {
  const [auctionDates, setAuctionDates] = useState([]);
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
          return +p1.Year > +p2.Year ? 1 : +p1.Year < +p2.Year ? -1 : 0;
        }),
      });
      return;
    }
    if (e.target.value === 'Buy It Now') {
      setFilteredCars({
        ...filteredCars,
        cars: filteredCars.cars.sort((p1, p2) => {
          return +p1['Buy-It-Now Price'] > +p2['Buy-It-Now Price']
            ? 1
            : +p1['Buy-It-Now Price'] < +p2['Buy-It-Now Price']
            ? -1
            : 0;
        }),
      });
      return;
    }
    if (e.target.value === 'Auction Date') {
      setFilteredCars({
        ...filteredCars,
        cars: filteredCars.cars.sort((p1, p2) => {
          return +p1['Sale Date M/D/CY'] > +p2['Sale Date M/D/CY']
            ? 1
            : +p1['Sale Date M/D/CY'] < +p2['Sale Date M/D/CY']
            ? -1
            : 0;
        }),
      });
      return;
    }
    if (e.target.value === 'Current Bid') {
      setFilteredCars({
        ...filteredCars,
        cars: filteredCars.cars.sort((p1, p2) => {
          return +p1['High Bid =non-vix,Sealed=Vix'] > +p2['High Bid =non-vix,Sealed=Vix']
            ? 1
            : +p1['High Bid =non-vix,Sealed=Vix'] < +p2['High Bid =non-vix,Sealed=Vix']
            ? -1
            : 0;
        }),
      });
      return;
    }
  };

  const handleClickAuctionDate = async (name) => {
    url.searchParams.set('key', name);
    navigate(`${url.search}`);
    //
  };

  useEffect(() => {
    const arr = [0, 1, 2, 3, 4].map((item) => {
      return {
        fetch: checkDate(item),
        name: `${checkDate(item).slice(0, 4)}/${checkDate(item).slice(4, 6)}/${checkDate(item).slice(6, 8)}`,
      };
    });
    // console.log(arr);
    setAuctionDates(arr);
  }, []);
  // console.log(auctionDates);
  useEffect(() => {
    // console.log(location.searchParams);
    async function getCars() {
      setCars({ cars: [], name: '', lastUpdated: '' });
      setFilteredCars({ cars: [], name: '', lastUpdated: '' });
      const docRef = doc(
        db,
        'cars',
        url.searchParams.get('auction') || '1',
        url.searchParams.get('make') || '1',
        url.searchParams.get('model') || '1',
        url.searchParams.get('key') || '1',
        url.searchParams.get('key') || '1'
      );

      const docSnap = await getDoc(docRef);
      // console.log(newDocSnap.data());
      if (docSnap.data()) {
        // console.log(docSnap.data().data[0]);
        if (docSnap.data().data[0]) {
          if (url.searchParams.get('key' === 'buynow')) {
            setCars({
              cars: Object.values(docSnap.data().data).sort((p1, p2) =>
                +p1['Buy-It-Now Price'] > +p2['Buy-It-Now Price']
                  ? 1
                  : +p1['Buy-It-Now Price'] < +p2['Buy-It-Now Price']
                  ? -1
                  : 0
              ),
              name: docSnap.data().make + ' ' + docSnap.data().model,
              lastUpdated: format(docSnap.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
            });
            setSortBy('Buy It Now');
          } else {
            setCars({
              cars: Object.values(docSnap.data().data).sort((p1, p2) =>
                +p1['Sale Date M/D/CY'] > +p2['Sale Date M/D/CY']
                  ? 1
                  : +p1['Sale Date M/D/CY'] < +p2['Sale Date M/D/CY']
                  ? -1
                  : 0
              ),
              name: docSnap.data().make + ' ' + docSnap.data().model,
              lastUpdated: format(docSnap.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
            });
            setSortBy('Auction Date');
          }
        } else {
          setFilteredCars({ cars: ['none'], name: '', lastUpdated: '' });
        }
      } else {
        setFilteredCars({ cars: ['none'], name: '', lastUpdated: '' });
      }
    }
    getCars();
  }, [searchParams.get('make'), searchParams.get('model'), searchParams.get('key')]);
  // console.log(filteredCars.cars);
  useEffect(() => {
    if (cars.cars[0]) {
      let obj = { ...cars };
      if (searchParams.get('years')) {
        obj = {
          ...cars,
          cars: cars.cars.filter((item) => searchParams.get('years').includes(item.Year)),
        };
      }
      if (searchParams.get('drive')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('drive').includes(item.Drive)),
        };
      }
      if (searchParams.get('color')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('color').includes(item.Color)),
        };
      }
      if (searchParams.get('damage')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('damage')?.includes(item['Damage Description'])),
        };
      }
      if (searchParams.get('cylinders')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => searchParams.get('cylinders')?.includes(item.Cylinders)),
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
          cars: obj.cars.filter((item) => +item.Odometer > +searchParams.get('odometerfrom')),
        };
      }
      if (searchParams.get('odometerto')) {
        obj = {
          ...obj,
          cars: obj.cars.filter((item) => +item.Odometer < +searchParams.get('odometerto')),
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
            <Grid item xs={12} sx={{ p: 1, pl: { xs: 1, sm: 5 } }}>
              <ButtonGroup color="secondary" size="small" variant="text" aria-label="text button group">
                {auctionDates.map((item, index) => {
                  if (index < auctionDates.length / 2)
                    return (
                      <Button
                        variant={url.searchParams.get('key') === item.fetch ? 'contained' : 'text'}
                        onClick={() => handleClickAuctionDate(item.fetch)}
                        sx={{ borderRight: 0.1, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                        key={index}
                      >
                        {item.name}
                      </Button>
                    );
                })}
              </ButtonGroup>
              <ButtonGroup color="secondary" size="small" variant="text" aria-label="text button group">
                {auctionDates.map((item, index) => {
                  if (index > auctionDates.length / 2)
                    return (
                      <Button
                        variant={url.searchParams.get('key') === item.fetch ? 'contained' : 'text'}
                        onClick={() => handleClickAuctionDate(item.fetch)}
                        key={index}
                      >
                        {item.name}
                      </Button>
                    );
                })}
              </ButtonGroup>
            </Grid>

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
                        url={`${location.search}&`}
                        key={item['Lot number']}
                        mode={context.darkMode}
                        href={'as'}
                        image={item.A.lotImages[0].link[0].url}
                        name={`${item.Year} ${item.Make} ${item['Model Group']} ${item.Trim}`}
                        lot={item['Lot number']}
                        price={item['High Bid =non-vix,Sealed=Vix']}
                        highlights={item['Runs/Drives']}
                        damage={item['Damage Description']}
                        odometer={`${item['Odometer']} ${
                          item['Odometer Brand'] === 'A' ? '(ACTUAL)' : '(NOT ACTUAL)'
                        } `}
                        buyNow={item['Buy-It-Now Price']}
                        auctionDate={item['Sale Date M/D/CY']}
                        creationDate={item['Create Date/Time'].slice(0, 10)}
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
                    .map((item) => item.Drive)
                    .filter((value, index) => cars.cars.map((item) => item.Drive).indexOf(value) === index)}
                  colorTypes={cars.cars
                    .map((item) => item.Color)
                    .filter((value, index) => cars.cars.map((item) => item.Color).indexOf(value) === index)}
                  damageTypes={cars.cars
                    .map((item) => item['Damage Description'])
                    .filter(
                      (value, index) =>
                        cars.cars.map((item) => item['Damage Description']).indexOf(value) === index
                    )}
                  cylindersType={cars.cars
                    .map((item) => item.Cylinders)
                    .filter(
                      (value, index) => cars.cars.map((item) => item.Cylinders).indexOf(value) === index
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
                  .map((item) => item.Drive)
                  .filter((value, index) => cars.cars.map((item) => item.Drive).indexOf(value) === index)}
                colorTypes={cars.cars
                  .map((item) => item.Color)
                  .filter((value, index) => cars.cars.map((item) => item.Color).indexOf(value) === index)}
                damageTypes={cars.cars
                  .map((item) => item['Damage Description'])
                  .filter(
                    (value, index) =>
                      cars.cars.map((item) => item['Damage Description']).indexOf(value) === index
                  )}
                cylindersType={cars.cars
                  .map((item) => item.Cylinders)
                  .filter((value, index) => cars.cars.map((item) => item.Cylinders).indexOf(value) === index)}
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
