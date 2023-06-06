import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { format, intervalToDuration } from 'date-fns';
import { BackIcon, ForwardIcon } from '../SVGIcons';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import calculateClearanceFee from '../calculateClearanceFee1';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import OrderDialog from '../components/OrderDialog';

const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function CopartCarPage({ carItems }) {
  const url = new URL(window.location.href);
  const [item, setItem] = useState({ 'Buy-It-Now Price': 0 });
  const [price, setPrice] = useState(0);
  const [auctionDate, setAuctionDate] = useState({ days: '', hours: '', minutes: '' });
  const [zoom, setZoom] = useState(false);
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
        +item['Buy-It-Now Price'],
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
        carPrice: +item['Buy-It-Now Price'],
        total: obj.shipment + +item['Buy-It-Now Price'] + obj.clearance + obj.fob + 500,
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
      // console.log(filteredItem);
      setItem(filteredItem);
      setPrice(+filteredItem['Buy-It-Now Price']);
      setImages(filteredItem.A.lotImages.map((item) => item.link[2].url));
    }
  }, [carItems]);

  const handleCorrectDate = (e, price) => {
    if (price || price === '') {
      if (!isNaN(price) || price === '') {
        setPrice(price);
        const obj = calculateClearanceFee(
          yearMonth.year,
          yearMonth.month,
          +price || 0,
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
          carPrice: +item['Buy-It-Now Price'],
          total: obj.shipment + (+price || 0) + obj.clearance + obj.fob + 500,
        });
      }
      return;
    }
    const obj = calculateClearanceFee(
      yearMonth.year,
      yearMonth.month,
      +item['Buy-It-Now Price'],
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
      carPrice: +item['Buy-It-Now Price'],
      total: obj.shipment + +item['Buy-It-Now Price'] + obj.clearance + obj.fob + 500,
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
        <Grid item container xs={12} p={2} pb={50}>
          <Grid item xs={12} container flexWrap={true} pb={1}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: '19px', sm: '25px' } }}>
                {item.Year} {item.Make} {item['Model Detail']}|
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
            <Grid
              sx={{
                mt: 2,
                '& > :not(style)': {
                  width: '100%',
                  overflow: 'hidden',
                  //   p: 1,
                },
              }}
              item
              container
              xs={12}
            >
              <Paper elevation={3}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRadius: '3px 3px 0 0',
                    width: '100%',
                    bgcolor: 'success.main',
                    p: '8px',
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: 'white' }}>Calculation To Armenia</Typography>
                </Box>
                <Grid p={{ xs: 1, sm: 2 }} item xs={12} container>
                  <Grid item xs={12} sm={6} direction="column" container pr={{ xs: 1, sm: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Vehicle:</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>Car Price -</Typography>
                        {/* <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                          {calculation.carPrice}$
                        </Typography> */}
                        <form>
                          <input
                            style={{
                              border: 'none',
                              // borderBottom: '1px solid black',
                              backgroundColor: 'lightblue',
                              maxWidth: '100px',
                              padding: '3px',
                              margin: '1px',
                              textAlign: 'center',
                              fontSize: '14px',
                              fontWeight: 500,
                            }}
                            placeholder="price"
                            // type="number"
                            value={price}
                            onChange={(e) => handleCorrectDate(e, e.currentTarget.value)}
                          ></input>
                          $
                        </form>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>Fob -</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                          {calculation.fee}$
                        </Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>Shipment -</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                          {calculation.shipment}$
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', pt: '4px' }}>
                      <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Customs clearance:</Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 1px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>Maqsaturq -</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                          {calculation.max}$
                        </Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>AAH -</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                          {calculation.AAH}$
                        </Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>Environmental tax -</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                          {calculation.nature}$
                        </Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} direction="column" container pt={1} pl={{ xs: 0, sm: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Other Expenses:</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>Taxes + Broker -</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>300$</Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                        <Typography sx={{ fontSize: '14px' }}>Commissions -</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>200$</Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '4px 0 2px 0' }}>
                        <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Total Summary -</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 700, pl: '2px' }}>
                          {calculation.total}$
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                          p: '4px 0 2px 0',
                        }}
                      >
                        {/* <Button
                          sx={{ textTransform: 'capitalize' }}
                          size="small"
                          variant="contained"
                          color="success"
                        >
                          Order now
                        </Button> */}
                        <OrderDialog item={item} />
                        <Box
                          onClick={() => setOpenColapse(!openCloapse)}
                          sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                        >
                          {openCloapse ? <ExpandLess /> : <ExpandMore />}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} container>
                    <Collapse sx={{ width: '100%' }} in={openCloapse} timeout="auto" unmountOnExit>
                      <Grid item xs={12} container justifyContent="flex-end" alignItems="flex-end">
                        <Typography
                          sx={{ width: '100%', textAlign: 'center', fontSize: '12px', color: 'red', py: 1 }}
                        >
                          If the year of the vin code in the picture does not match, please correct it!
                        </Typography>
                        <FormControl variant="standard" sx={{ mx: 1, minWidth: 80 }}>
                          <InputLabel>Year</InputLabel>
                          <Select
                            name="year"
                            value={yearMonth.year}
                            onChange={handleChangeYearMonth}
                            label="Year"
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
                        <FormControl variant="standard" sx={{ mx: 1, minWidth: 80 }}>
                          <InputLabel>Month</InputLabel>
                          <Select
                            name="month"
                            value={yearMonth.month}
                            onChange={handleChangeYearMonth}
                            label="Month"
                          >
                            {months.map((item, index) => {
                              return (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <Button onClick={handleCorrectDate} variant="contained">
                          Correct
                        </Button>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={6} md={5} alignContent="flex-start" px={{ xs: 0, sm: 2, md: 4 }}>
            <Box
              sx={{
                display: 'flex',
                mt: { xs: 1, sm: 0 },
                width: '100%',
                maxWidth: { xs: '100%', sm: 360 },
                '& > :not(style)': {
                  width: '100%',
                  p: 1,
                },
              }}
            >
              <Paper elevation={3}>
                <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 360 } }}>
                  <Link to={`https://www.copart.com/lot/${item['Lot number']}`} target="_blank">
                    Go to copart lot# {item['Lot number']}
                  </Link>
                  <nav aria-label="main mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <Typography sx={{ fontWeight: 700 }}>
                          {item.Year} {item.Make} {item['Model Detail']}
                        </Typography>
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontWeight: 600 } }}
                            primary={item.VIN}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="VIN:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontWeight: 600 } }}
                            primary={item['High Bid =non-vix,Sealed=Vix'] + '0$'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Current Bid:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontWeight: 600, color: 'red' } }}
                            primary={item['Buy-It-Now Price'] + '0$'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontWeight: 600, fontSize: '16px' } }}
                          primary="Buy It Now:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontWeight: 600 } }}
                            primary={item['Lot number']}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Lot#"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontWeight: 600 } }}
                            primary={format(new Date(item['Create Date/Time'].slice(0, 10)), 'P - hh:mm')}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Item Added"
                        />
                      </ListItem>
                      <Divider />

                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '13px' } }}
                            primary={`${item['Location state']} - ${
                              item['Sale Title Type'] === 'SC'
                                ? 'SALVAGE CERTIFICATE'
                                : item['Sale Title Type'] === 'CD'
                                ? 'CERTIFICATE OF DESTRUCTION'
                                : item['Sale Title Type'] === 'ST'
                                ? 'CERT OF TITLE-SALVAGE'
                                : item['Sale Title Type'] === 'R1'
                                ? 'CERT OF TITLE-SLVG REBLD'
                                : item['Sale Title Type'] === 'SV'
                                ? 'SALVAGE VEHICLE TITLE'
                                : 'BILL OF SALE'
                            }`}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Title Code:"
                        />
                      </ListItem>
                      <Divider />

                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={`${+item.Odometer} ${
                              item['Odometer Brand'] === 'A' ? '(ACTUAL)' : '(NOT ACTUAL)'
                            }`}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Odometer:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={`${
                              item['Runs/Drives'] === 'DEFAULT' ? 'Enhanced Vehicles' : 'Run and Drive'
                            }`}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Highlights:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item['Damage Description']}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Primary Damage:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item['Secondary Damage'] || 'unknown'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Secondary Damage:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item.Color || 'unknown'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Color:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item.Engine || 'unknown'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Engine Type:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item.Cylinders || 'unknown'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Cylinders:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item.Drive || 'unknown'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Drive:"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item['Has Keys-Yes or No'] || 'unknown'}
                          />
                        }
                      >
                        <ListItemText
                          sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                          primary="Keys:"
                        />
                      </ListItem>
                    </List>
                  </nav>
                </Box>
              </Paper>
            </Box>

            <Box
              sx={{
                display: 'flex',
                width: '100%',
                mt: 2,
                maxWidth: { xs: '100%', sm: 360 },
                '& > :not(style)': {
                  width: '100%',
                  overflow: 'hidden',
                  p: 1,
                },
              }}
            >
              <Paper elevation={3}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRadius: '3px 3px 0 0',
                    width: '110%',
                    bgcolor: 'primary.dark',
                    m: '-8px 0 0 -8px',
                    p: '8px',
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: 'white' }}>Sale Information</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%',
                    py: '3px',
                    maxWidth: { xs: '100%', sm: 360 },
                  }}
                >
                  <Typography>Sale Status:</Typography>
                  <Typography sx={{ maxWidth: '145px', fontSize: '14px', textAlign: 'right' }}>
                    {item['Sale Status']}
                  </Typography>
                </Box>
                <Divider sx={{ width: '100%', maxWidth: 360 }} />
                <Box
                  sx={{
                    display: 'flex',
                    py: '3px',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: 360 },
                  }}
                >
                  <Typography>Location:</Typography>
                  <Typography sx={{ maxWidth: '145px', fontSize: '14px', textAlign: 'right' }}>
                    {item['Location state'] + ' - ' + item['Location city']}
                  </Typography>
                </Box>
                <Divider sx={{ width: '100%', maxWidth: 360 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%',
                    py: '3px',
                    maxWidth: { xs: '100%', sm: 360 },
                  }}
                >
                  <Typography>Sale Date:</Typography>
                  <Typography sx={{ maxWidth: '145px', fontSize: '14px', textAlign: 'right' }}>
                    {format(item.armAuctDate, 'iii. PP kk:mm:ss')}
                  </Typography>
                </Box>

                <Divider sx={{ width: '100%', maxWidth: 360 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%',
                    // pt: '10px',
                    py: '3px',
                    maxWidth: { xs: '100%', sm: 360 },
                  }}
                >
                  <Typography>Time Left:</Typography>
                  <Typography
                    sx={{
                      maxWidth: '145px',
                      fontSize: '14px',
                      textAlign: 'right',
                      color: 'red',
                      fontWeight: 500,
                    }}
                  >
                    {!auctionDate.starts
                      ? auctionDate.days + 'D ' + auctionDate.hours + 'H ' + auctionDate.minutes + 'min'
                      : auctionDate.starts}
                  </Typography>
                </Box>
                <Divider sx={{ width: '100%', maxWidth: 360 }} />
              </Paper>
            </Box>
          </Grid>

          {/* <Button>Call</Button> */}
        </Grid>
      )}
    </>
  );
}
