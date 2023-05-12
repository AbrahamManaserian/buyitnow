import { Grid, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { format } from 'date-fns';
import CarCard from '../components/CarCard';
import { AppContext } from '../App';
import { CarInputs } from '../components/CarInputs';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import CopartCarPage from './CopartCarPage';

export default function SearchPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('model'));
  let location = useLocation();
  const context = useContext(AppContext);
  const url = new URL(window.location.href);
  //   console.log(url.searchParams.get('model'));
  const [cars, setCars] = useState({ cars: [], name: '', lastUpdated: '' });
  useEffect(() => {
    // console.log('carsRogue.cars');
    async function getCars() {
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
    }
    getCars();
  }, [location]);
  console.log(cars);
  return (
    <Grid item container xs>
      {!url.searchParams.get('lot') ? (
        <Grid item xs container>
          <Typography>Search Page</Typography>
          <CarInputs auction="copart" />
          <Grid
            item
            container
            direction="row"
            m="10px"
            sx={{ p: { xs: '0 0 0 0', sm: '0 0 0 30px' }, justifyContent: 'center' }}
          >
            {cars.cars[0] && (
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
                  {cars.name} - {cars.cars.length} items - {cars.lastUpdated}
                </Typography>
                {cars.cars.map((item, index) => {
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
          </Grid>
        </Grid>
      ) : (
        <CopartCarPage carItems={cars.cars} />
      )}
    </Grid>
  );
}
