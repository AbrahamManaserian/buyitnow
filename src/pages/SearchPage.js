import { Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { format } from 'date-fns';
import CarCard from '../components/CarCard';
import { AppContext } from '../App';
import { CarInputs } from '../components/CarInputs';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CopartCarPage from './CopartCarPage';
import Filter from '../components/Filter';

export default function SearchPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState({ cars: [], name: '', lastUpdated: '' });
  const [cars, setCars] = useState({ cars: [], name: '', lastUpdated: '' });
  let location = useLocation();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const url = new URL(window.location.href);
  //   console.log(cars);

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
      setCars({
        cars: Object.values(docSnap.data().data).sort((p1, p2) =>
          +p1.buyNowNumber > +p2.buyNowNumber ? 1 : +p1.buyNowNumber < +p2.buyNowNumber ? -1 : 0
        ),
        name: docSnap.data().name,
        lastUpdated: format(docSnap.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      });
      //   setFilteredCars({
      //     cars: Object.values(docSnap.data().data).sort((p1, p2) =>
      //       +p1.buyNowNumber > +p2.buyNowNumber ? 1 : +p1.buyNowNumber < +p2.buyNowNumber ? -1 : 0
      //     ),
      //     name: docSnap.data().name,
      //     lastUpdated: format(docSnap.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      //   });
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

  //   console.log(filteredCars);
  return (
    <Grid item container xs>
      <Grid item xs container>
        {!url.searchParams.get('lot') ? (
          <Grid item xs={12} container>
            <CarInputs auction="copart" />

            {!cars.cars[0] && <LinearProgress sx={{ width: '100%', mx: 5 }} color="primary" />}

            <Grid
              xs
              item
              container
              direction="row"
              m="10px"
              sx={{ p: { xs: '0 0 0 0', sm: '0 0 0 30px' }, justifyContent: 'center' }}
            >
              {filteredCars.cars[0] && filteredCars.cars[0] !== 'none' && (
                <>
                  <Typography
                    color="primary"
                    sx={{
                      width: '100%',
                      my: '15px',
                      borderBottom: 0.1,
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {filteredCars.name} - {filteredCars.cars.length} items - {filteredCars.lastUpdated}
                  </Typography>
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
              {filteredCars.cars[0] === 'none' && 'No Item'}
            </Grid>
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
            />
          </Grid>
        ) : (
          <CopartCarPage carItems={cars.cars} />
        )}
      </Grid>
    </Grid>
  );
}
