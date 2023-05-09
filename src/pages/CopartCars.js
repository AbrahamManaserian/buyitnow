import { Box, Button, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';

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
  const [carsRogue, setCarsRogue] = useState({ cars: [], name: '', lastUpdated: '' });
  const [carsMercEclass, setCarsMercEclass] = useState({ cars: [], name: '', lastUpdated: '' });
  const [carsMercCClass, setCarsMercCClass] = useState({ cars: [], name: '', lastUpdated: '' });
  const [carsJeepCompass, setCarsJeepCompass] = useState({ cars: [], name: '', lastUpdated: '' });
  const [carsRogueBuyNow, setCarsRogueBuyNow] = useState({ cars: [], name: '', lastUpdated: '' });
  // console.log(carsRogue.cars);
  // console.log(new Date(carsRogue?.lastUpdated.nanoseconds));
  useEffect(() => {
    async function getCars() {
      const docRefRogue = doc(db, 'cars', 'copart', 'Nissan', 'RogueBuyNow');
      const docRefRogueBuyNow = doc(db, 'cars', 'copart', 'Nissan', 'RogueSportBuyNow');
      const docRefMercEclass = doc(db, 'cars', 'copart', 'Mercedes', 'EClassBuyNow');
      const docRefMercCClass = doc(db, 'cars', 'copart', 'Mercedes', 'CClassBuyNow');
      const docRefJeepCompass = doc(db, 'cars', 'copart', 'Jeep', 'CompartBuyNow');

      const docSnapRogue = await getDoc(docRefRogue);
      setCarsRogue({
        cars: Object.values(docSnapRogue.data().data).sort((p1, p2) =>
          p1.auctionDate1 > p2.auctionDate1 ? 1 : p1.auctionDate1 < p2.auctionDate1 ? -1 : 0
        ),
        name: docSnapRogue.data().name,
        lastUpdated: format(docSnapRogue.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      });
      // const docSnapRefMercEclass = await getDoc(docRefMercEclass);
      const docSnapMercCClass = await getDoc(docRefMercCClass);
      // const docSnapJeepCompass = await getDoc(docRefJeepCompass);
      // const date = format(docSnapRogue.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss');
      setCarsMercCClass({
        cars: Object.values(docSnapMercCClass.data().data).sort((p1, p2) =>
          p1.auctionDate1 > p2.auctionDate1 ? 1 : p1.auctionDate1 < p2.auctionDate1 ? -1 : 0
        ),
        name: docSnapMercCClass.data().name,
        lastUpdated: format(docSnapMercCClass.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      });
      // setCarsMercEclass({
      //   cars: Object.values(docSnapRefMercEclass.data().data).sort((p1, p2) =>
      //     p1.auctionDate1 > p2.auctionDate1 ? 1 : p1.auctionDate1 < p2.auctionDate1 ? -1 : 0
      //   ),
      //   name: docSnapRefMercEclass.data().name,
      //   lastUpdated: format(docSnapRefMercEclass.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      // });
      // setCarsJeepCompass({
      //   cars: Object.values(docSnapJeepCompass.data().data).sort((p1, p2) =>
      //     p1.auctionDate1 > p2.auctionDate1 ? 1 : p1.auctionDate1 < p2.auctionDate1 ? -1 : 0
      //   ),
      //   name: docSnapJeepCompass.data().name,
      //   lastUpdated: format(docSnapJeepCompass.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      // });

      const docSnapRogueBuyNow = await getDoc(docRefRogueBuyNow);

      setCarsRogueBuyNow({
        cars: Object.values(docSnapRogueBuyNow.data().data).sort((p1, p2) =>
          p1.auctionDate1 > p2.auctionDate1 ? 1 : p1.auctionDate1 < p2.auctionDate1 ? -1 : 0
        ),
        name: docSnapRogueBuyNow.data().name,
        lastUpdated: format(docSnapRogueBuyNow.data().lastUpdated, 'MM/dd/yyyy - H:mm:ss'),
      });
    }
    getCars();
  }, []);
  const context = useContext(AppContext);
  // console.log(cars);
  return (
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

      <Grid
        item
        container
        direction="row"
        m="10px"
        sx={{ p: { xs: '0 0 0 0', sm: '0 0 0 30px' }, justifyContent: 'center' }}
      >
        {carsRogue.cars[0] && (
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
              {carsRogue.name} - {carsRogue.lastUpdated}
            </Typography>
            {carsRogue.cars.map((item, index) => {
              return (
                <CarCard
                  key={item.lot}
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
        {carsMercCClass.cars[0] && (
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
              {carsMercCClass.name} - {carsMercCClass.lastUpdated}
            </Typography>
            {carsMercCClass.cars.map((item, index) => {
              return (
                <CarCard
                  key={item.lot}
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
              {carsRogueBuyNow.name} - {carsRogueBuyNow.lastUpdated}
            </Typography>
            {carsRogueBuyNow.cars.map((item, index) => {
              return (
                <CarCard
                  key={item.lot}
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
        {/* {data.map((item, index) => {
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
        })} */}
      </Grid>
    </Grid>
  );
}
