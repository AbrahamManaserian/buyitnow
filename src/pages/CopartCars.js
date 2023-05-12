import { Box, Button, Grid, Typography } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
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
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { format, formatDistanceToNow, intervalToDuration } from 'date-fns';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CarInputs } from '../components/CarInputs';

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
export const CarsContext = createContext();
export default function CopartCars() {
  let location = useLocation();
  // console.log(location.search);
  const [carsRogueBuyNow, setCarsRogueBuyNow] = useState({ cars: [], name: '', lastUpdated: '' });
  const [carsMercCBuyNow, setCarsMercCBuyNow] = useState({ cars: [], name: '', lastUpdated: '' });
  const [carsRogueSportBuyNow, setCarsRogueSportBuyNow] = useState({ cars: [], name: '', lastUpdated: '' });

  // console.log(new Date(carsRogue?.lastUpdated.nanoseconds));
  useEffect(() => {
    // console.log('carsRogue.cars');
    async function getCars() {
      const docRefRogueSportBuyNow = doc(db, 'cars', 'copart', 'Nissan', 'RogueSportBuyNow');
      const docRefRogueBuyNow = doc(db, 'cars', 'copart', 'Nissan', 'RogueBuyNow');
      const docRefMercCBuyNow = doc(db, 'cars', 'copart', 'Mercedes', 'CBuyNow');

      const docSnapMercCBuyNow = await getDoc(docRefMercCBuyNow);
      setCarsMercCBuyNow({
        cars: Object.values(docSnapMercCBuyNow.data().data).sort((p1, p2) =>
          +p1.buyNowNumber > +p2.buyNowNumber ? 1 : +p1.buyNowNumber < +p2.buyNowNumber ? -1 : 0
        ),
        name: docSnapMercCBuyNow.data().name,
        lastUpdated: format(docSnapMercCBuyNow.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      });

      const docSnapRogueBuyNow = await getDoc(docRefRogueBuyNow);
      setCarsRogueBuyNow({
        cars: Object.values(docSnapRogueBuyNow.data().data).sort((p1, p2) =>
          +p1.buyNowNumber > +p2.buyNowNumber ? 1 : +p1.buyNowNumber < +p2.buyNowNumber ? -1 : 0
        ),
        name: docSnapRogueBuyNow.data().name,
        lastUpdated: format(docSnapRogueBuyNow.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      });

      const docSnapRogueSportBuyNow = await getDoc(docRefRogueSportBuyNow);
      setCarsRogueSportBuyNow({
        cars: Object.values(docSnapRogueSportBuyNow.data().data).sort((p1, p2) =>
          +p1.buyNowNumber > +p2.buyNowNumber ? 1 : +p1.buyNowNumber < +p2.buyNowNumber ? -1 : 0
        ),
        name: docSnapRogueSportBuyNow.data().name,
        lastUpdated: format(docSnapRogueSportBuyNow.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      });
    }
    getCars();
  }, []);
  const context = useContext(AppContext);
  return (
    <CarsContext.Provider
      value={[...carsRogueBuyNow.cars, ...carsRogueSportBuyNow.cars, ...carsMercCBuyNow.cars]}
    >
      <Grid item xs={12} container>
        <Outlet />
        {!location.search && (
          <Grid item xs={12} container>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 2 }}>
              <CopartIcon />
              <Typography sx={{ fontSize: '18px' }} marginLeft="10px">
                {getText('cars', context.language, textCopartCars)} -
              </Typography>
              <Link
                to="/asd"
                style={{
                  textDecoration: 'none',
                  padding: '0 5px 0 5px',
                  color: 'inherit',
                  fontSize: '18px',
                  marginLeft: '5px',
                }}
              >
                Buy it now
              </Link>
            </Box>
            <CarInputs auction="copart" />
            <Grid
              item
              container
              direction="row"
              m="10px"
              sx={{ p: { xs: '0 0 0 0', sm: '0 0 0 30px' }, justifyContent: 'center' }}
            >
              {carsMercCBuyNow.cars[0] && (
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
                    {carsMercCBuyNow.name} - {carsMercCBuyNow.cars.length} items -{' '}
                    {carsMercCBuyNow.lastUpdated}
                  </Typography>
                  {carsMercCBuyNow.cars.map((item, index) => {
                    return (
                      <CarCard
                        url="/copart-cars/search?"
                        key={item.lot}
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
              {carsRogueBuyNow.cars[0] && (
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
                    {carsRogueBuyNow.name} - {carsRogueBuyNow.cars.length} items -{' '}
                    {carsRogueBuyNow.lastUpdated}
                  </Typography>
                  {carsRogueBuyNow.cars.map((item, index) => {
                    return (
                      <CarCard
                        url="/copart-cars/search?"
                        key={item.lot}
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
              {carsRogueSportBuyNow.cars[0] && (
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
                    {carsRogueSportBuyNow.name} - {carsRogueSportBuyNow.cars.length} items -{' '}
                    {carsRogueSportBuyNow.lastUpdated}
                  </Typography>
                  {carsRogueSportBuyNow.cars.map((item, index) => {
                    return (
                      <CarCard
                        key={item.lot}
                        lot={item.lot}
                        url="/copart-cars/search?"
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
        )}
      </Grid>
    </CarsContext.Provider>
  );
}
