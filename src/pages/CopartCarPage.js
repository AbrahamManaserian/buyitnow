import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { format, intervalToDuration } from 'date-fns';
import { BackIcon, ForwardIcon } from '../SVGIcons';

import calculateClearanceFee from '../calculateClearanceFee1';
import MainCopartCard from '../components/MainCopartCard';
import SaleCard from '../components/SaleCard';
import ClearanceCalculation from '../components/ClearanceCalculation';
import CardAlertService from '../components/CardAlertService';
export default function CopartCarPage({ carItems, mode }) {
  const url = new URL(window.location.href);
  const [item, setItem] = useState({ 'Buy-It-Now Price': 0 });
  const [price, setPrice] = useState(0);
  const [auctionDate, setAuctionDate] = useState({ days: '', hours: '', minutes: '' });
  // const [zoom, setZoom] = useState(false);
  const [images, setImages] = useState([]);
  const [imgIndex, setImgIndex] = useState(-1);
  const [yearMonth, setYearMonth] = useState({ year: '', month: '' });
  const [openCloapse, setOpenColapse] = useState(false);
  const [calculation, setCalculation] = useState({
    fee: 0,
    max: 0,
    AAH: 0,
    clearance: 0,
    shipment: 0,
    carPrice: 0,
    total: 0,
  });

  useEffect(() => {
    if (item['Buy-It-Now Price']) {
      //   console.log(+item.Engine.slice(0, 3));
      const obj = calculateClearanceFee(
        +item.Year,
        12,
        +price,
        +item.Engine.slice(0, 3) || 1.1,
        item['Location state'],
        item['Yard name'].slice(5),
        1.0893
      );
      //   console.log(obj);
      setCalculation({
        fee: obj.fob,
        max: obj.max,
        AAH: obj.AAH,
        nature: obj.nature,
        clearance: obj.clearance,
        shipment: obj.shipment,
        carPrice: +price,
        total: obj.shipment + +price + obj.clearance + obj.fob + 500,
      });
      setYearMonth({ year: +item.Year, month: 12 });

      if (new Date() - item.armAuctDate < 0) {
        const date = intervalToDuration({
          start: new Date(),
          end: item.armAuctDate,
        });
        setAuctionDate(date);
      } else if (new Date() - item.armAuctDate > 4 * 3600 * 1000) {
        setAuctionDate({ starts: 'Auction ended' });
      } else {
        setAuctionDate({ starts: 'Auction startes' });
      }
    }
  }, [item]);
  useEffect(() => {
    const filteredItem = carItems.find((item) => item['Lot number'] === url.searchParams.get('lot'));
    if (filteredItem) {
      console.log(filteredItem);
      setItem(filteredItem);
      if (+filteredItem['Buy-It-Now Price'] && +filteredItem['Buy-It-Now Price'] !== 0) {
        setPrice(+filteredItem['Buy-It-Now Price']);
      } else {
        setPrice(+filteredItem['High Bid =non-vix,Sealed=Vix']);
      }
      setImages(filteredItem.A.lotImages.map((item) => item.link[2].url));
    }
  }, [carItems]);

  const handleCorrectDate = (e, newPrice) => {
    if (newPrice || newPrice === '') {
      if (!isNaN(newPrice) || newPrice === '') {
        setPrice(newPrice);
        const obj = calculateClearanceFee(
          yearMonth.year,
          yearMonth.month,
          +newPrice || 0,
          +item.Engine.slice(0, 3) || 1.1,
          item['Location state'],
          item['Yard name'].slice(5),
          1.0893
        );
        setCalculation({
          fee: obj.fob,
          max: obj.max,
          AAH: obj.AAH,
          nature: obj.nature,
          clearance: obj.clearance,
          shipment: obj.shipment,
          carPrice: +newPrice,
          total: obj.shipment + (+newPrice || 0) + obj.clearance + obj.fob + 500,
        });
      }
      return;
    }
    const obj = calculateClearanceFee(
      yearMonth.year,
      yearMonth.month,
      +price,
      +item.Engine.slice(0, 3) || 1.1,
      item['Location state'],
      item['Yard name'].slice(5),
      1.0893
    );
    setCalculation({
      fee: obj.fob,
      max: obj.max,
      AAH: obj.AAH,
      nature: obj.nature,
      clearance: obj.clearance,
      shipment: obj.shipment,
      carPrice: +price,
      total: obj.shipment + +price + obj.clearance + obj.fob + 500,
    });
    setOpenColapse(false);
  };
  const handleChangeYearMonth = (e) => {
    if (e.target.name === 'year') {
      setYearMonth({ ...yearMonth, year: e.target.value });
    } else {
      setYearMonth({ ...yearMonth, month: e.target.value });
    }
  };

  const handleClickImage = (name) => {
    if (name !== 'back') {
      if (imgIndex < item.A.lotImages.length - 1) {
        if (imgIndex === -1) {
          setImgIndex(1);
        } else {
          setImgIndex(imgIndex + 1);
        }
      } else {
        setImgIndex(0);
      }
    } else {
      if (imgIndex === -1 || imgIndex === 0) {
        setImgIndex(item.A.lotImages.length - 1);
      } else {
        setImgIndex(imgIndex - 1);
      }
    }
  };
  //   console.log(carItems);
  // console.log(item);
  //   console.log(images);
  return (
    <>
      {item.A && (
        <Grid item container xs={12} p={2}>
          <Grid item xs={12} container flexWrap={true} pb={1}>
            {/* Glxavor nkar  */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: '19px', sm: '25px' } }}>
                {item.Year} {item.Make} {item['Model Group']} {item.Trim}|
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  p: '0 6px 0 6px',
                  m: '5px 0 5px 5px',
                  bgcolor: item['Runs/Drives'] !== 'Run & Drive Verified' ? '#80deea' : '#9ccc65',
                  borderRadius: '50%',
                }}
              >
                {item['Runs/Drives'] !== 'Run & Drive Verified' ? 'E' : 'R'}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
              }}
            >
              Lot # {item['Lot number']} | Sale Location:
            </Typography>
            <Typography
              color="primary"
              sx={{
                fontSize: '12px',
                textDecoration: 'underline',
                px: '4px',
              }}
            >
              {item['Location state']} - {item['Location city']}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
              }}
            >
              | Sale Date: {format(item.armAuctDate, 'iii. PP kk:mm:ss')}
            </Typography>
          </Grid>

          <Grid alignContent="flex-start" item container xs={12} sm={6} md={7}>
            {/* Puchur nkarner u slaqner */}
            <Grid alignContent="flex-start" item container xs={12} pb={1} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '25px',
                  height: '38px',
                  width: '38px',
                  bgcolor: 'black',
                  opacity: 0.5,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              ></Box>
              <Box
                sx={{
                  position: 'absolute',
                  cursor: 'pointer',
                  bottom: '25px',
                  right: 0,
                  height: '38px',
                  width: '38px',
                  bgcolor: 'black',
                  opacity: 0.5,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              ></Box>
              <div
                onClick={() => handleClickImage('back')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '38px',
                  width: '38px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  zIndex: 2,
                  position: 'absolute',
                  bottom: '25px',
                  left: '2px',
                }}
              >
                <BackIcon />
              </div>
              <div
                onClick={() => handleClickImage('forward')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '2px',
                  justifyContent: 'center',
                  height: '38px',
                  width: '38px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  zIndex: 2,
                  position: 'absolute',
                  bottom: '25px',
                  right: 0,
                }}
              >
                <ForwardIcon />
              </div>
              <img
                style={{ width: '100%', height: 'auto', display: imgIndex === -1 ? 'block' : 'none' }}
                src={item.A.lotImages[0].link[0].url}
              />
              {images.map((item, index) => {
                return (
                  <img
                    key={index}
                    style={{ width: '100%', height: 'auto', display: imgIndex === index ? 'block' : 'none' }}
                    src={item}
                  />
                );
              })}
            </Grid>
            {/* Puchur nkarner */}
            <Grid item container xs={12} alignItems="flex-start" alignContent="flex-start">
              {item.A.lotImages.map((item1, index) => {
                return (
                  <Grid
                    sx={{
                      border: index === imgIndex ? 1 : 0,
                      padding: '4px',
                      borderRadius: '5px',
                      minHeight: '50px',
                    }}
                    key={index}
                    item
                    container
                    alignContent="flex-start"
                    xs={3}
                    sm={3}
                    md={2}
                  >
                    <img
                      onClick={() => setImgIndex(index)}
                      onLoad={() => {
                        if (index === item.A.lotImages.length - 1) {
                          setImages(item.A.lotImages.map((item1) => item1.link[1].url));
                        }
                      }}
                      style={{
                        borderRadius: 2,
                        width: '100%',
                        height: 'auto',
                        cursor: 'pointer',
                      }}
                      src={item1.link[2].url}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <ClearanceCalculation
              handleCorrectDate={handleCorrectDate}
              price={price}
              calculation={calculation}
              openCloapse={openCloapse}
              setOpenColapse={setOpenColapse}
              yearMonth={yearMonth}
              handleChangeYearMonth={handleChangeYearMonth}
              item={item}
              mode={mode}
            />
          </Grid>
          <Grid item container xs={12} sm={6} md={5} alignContent="flex-start" px={{ xs: 0, sm: 2, md: 4 }}>
            <MainCopartCard item={item} />
            <SaleCard item={item} auctionDate={auctionDate} />
            <CardAlertService item={item} />
          </Grid>

          <Grid item xs={12}>
            <Typography>Abraham</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
