import { Grid, LinearProgress, Typography } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import CarCard from '../components/CarCard';
import { Outlet, useLocation } from 'react-router-dom';
import { CarInputs } from '../components/CarInputs';
import getCar from '../getCarsFirebase';
import CopartCarPage from './CopartCarPage';

export const CarsContext = createContext();
export default function CopartCars() {
  let location = useLocation();
  // console.log(location.search);
  const [accordBuyNow, setAccordBuyNow] = useState([]);
  useEffect(() => {
    // console.log('carsRogue.cars');
    async function getCars() {
      const car = await getCar('HONDA', 'ACCORD', 'buynow');
      const arr = car.data.map((item) => {
        const timeDifference = item['Time Zone'] === 'PDT' ? 12 * 3600 * 1000 : 8 * 3600 * 1000;
        // console.log(timeDifference);
        const date = new Date(
          +new Date(
            +item['Sale Date M/D/CY'].slice(0, 4),
            +item['Sale Date M/D/CY'].slice(4, 6) - 1,
            +item['Sale Date M/D/CY'].slice(6, 8),
            +item['Sale time (HHMM)'].slice(0, 2)
          ) + timeDifference
        );
        return { ...item, armAuctDate: date };
      });
      setAccordBuyNow(arr);
    }
    getCars();
  }, []);
  // console.log(accordBuyNow);
  const context = useContext(AppContext);

  return (
    <CarsContext.Provider value={accordBuyNow}>
      <Grid item xs={12} container>
        {/* <Outlet /> */}
        {!location.search ? (
          <Grid item xs={12} container>
            <CarInputs auction="copart" />
            <LinearProgress
              sx={{
                width: '100%',
                mx: { xs: '8px', sm: '25px' },
                visibility: accordBuyNow[0] ? 'hidden' : '',
              }}
              color="primary"
            />
            <Grid
              item
              container
              direction="row"
              m="10px"
              sx={{ p: { xs: '0 0 0 0', sm: '0 0 0 30px' }, justifyContent: 'center' }}
            >
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
                HONDA ACCORD - {accordBuyNow.length} items
              </Typography>
              {accordBuyNow[0] &&
                accordBuyNow.map((item) => {
                  if (item.A.status) {
                    return null;
                  } else {
                    return (
                      <CarCard
                        key={item['Lot number']}
                        mode={context.darkMode}
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
                        // auctionDate={item['Sale Date M/D/CY']}
                        url="/copart-cars/search?"
                        creationDate={item['Create Date/Time'].slice(0, 10)}
                        time={item['Sale time (HHMM)']}
                        timeZone={item['Time Zone']}
                        auctionDate={item.armAuctDate}
                      />
                    );
                  }
                })}
            </Grid>
          </Grid>
        ) : (
          <CopartCarPage carItems={accordBuyNow} />
        )}
      </Grid>
    </CarsContext.Provider>
  );
}
