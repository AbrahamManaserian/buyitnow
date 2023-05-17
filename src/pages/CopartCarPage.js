import { Link, useLocation, useParams } from 'react-router-dom';
import { CarsContext } from './CopartCars';
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BackIcon, ForwardIcon } from '../SVGIcons';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import calculateClearanceFee from '../calculateClearanceFee';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

// console.log(calculateClearanceFee(2017, 7, 10000, 2.5, 2000, 1.0893));
const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export default function CopartCarPage({ carItems }) {
  // console.log(format(Date.now(), 'MM/dd/yyyy - H:mm:ss'));
  const url = new URL(window.location.href);
  const [item, setItem] = useState({});
  const [image, setImage] = useState('');
  const cars = useContext(CarsContext);
  const [date, setDate] = useState({});
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
    if (item.name) {
      const obj = calculateClearanceFee(
        +item.name.slice(1, 5),
        12,
        +item.buyNowNumber,
        +item.detail.engine.slice(0, 3) || 1.1,
        item.location,
        1.0893
      );
      setCalculation({
        fee: obj.fob,
        max: obj.max,
        AAH: obj.AAH,
        nature: obj.nature,
        clearance: obj.clearance,
        shipment: obj.shipment,
        carPrice: item.buyNowNumber,
        total: obj.shipment + +item.buyNowNumber + obj.clearance + obj.fob + 500,
      });
      setYearMonth({ year: +item.name.slice(1, 5), month: 12 });
    }
  }, [item]);
  useEffect(() => {
    if (!carItems) {
      const filteredItem = cars.find((item) => item.lot === url.searchParams.get('lot'));
      if (filteredItem) {
        setDate(
          intervalToDuration({
            start: new Date(),
            end: new Date(filteredItem.auctionDate1),
          })
        );

        setItem(filteredItem);
        setImage(filteredItem?.img);
      }
    } else {
      const filteredItem = carItems.find((item) => item.lot === url.searchParams.get('lot'));
      if (filteredItem) {
        setDate(
          intervalToDuration({
            start: new Date(),
            end: new Date(filteredItem.auctionDate1),
          })
        );

        setItem(filteredItem);
        setImage(filteredItem?.img);
      }
    }
  }, [cars, carItems]);

  const handleCorrectDate = () => {
    const obj = calculateClearanceFee(
      yearMonth.year,
      yearMonth.month,
      +item.buyNowNumber,
      +item.detail.engine.slice(0, 3) || 1.1,
      item.location,
      1.0893
    );
    setCalculation({
      fee: obj.fob,
      max: obj.max,
      AAH: obj.AAH,
      nature: obj.nature,
      clearance: obj.clearance,
      shipment: obj.shipment,
      carPrice: item.buyNowNumber,
      total: obj.shipment + +item.buyNowNumber + obj.clearance + obj.fob + 500,
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
    if (name === 'back') {
      if (item.detail.imgs.hd.indexOf(image) === -1 || item.detail.imgs.hd.indexOf(image) === 0) {
        setImage(item.detail.imgs.hd[item.detail.imgs.hd.length - 1]);
      } else {
        setImage(item.detail.imgs.hd[item.detail.imgs.hd.indexOf(image) - 1]);
      }
    } else {
      if (item.detail.imgs.hd.indexOf(image) === item.detail.imgs.hd.length - 1) {
        setImage(item.detail.imgs.hd[0]);
      } else if (item.detail.imgs.hd.indexOf(image) === -1) {
        setImage(item.detail.imgs.hd[1]);
      } else {
        setImage(item.detail.imgs.hd[item.detail.imgs.hd.indexOf(image) + 1]);
      }
    }
  };
  return (
    <>
      {item.detail && (
        <Grid item container xs={12} p={2} pb={50}>
          <Grid item xs={12} container flexWrap={true} pb={1}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: '19px', sm: '25px' } }}>
                {item.name} |
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  p: '0 6px 0 6px',
                  m: '5px 0 5px 5px',
                  bgcolor: item.condition !== 'Run and Drive Icon' ? '#80deea' : '#9ccc65',
                  borderRadius: '50%',
                }}
              >
                {item.condition !== 'Run and Drive Icon' ? 'E' : 'R'}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
              }}
            >
              Lot # {item.lot} | Sale Location:
            </Typography>
            <Typography
              color="primary"
              sx={{
                fontSize: '12px',
                textDecoration: 'underline',
                px: '4px',
              }}
            >
              {item.location || 'as'}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
              }}
            >
              | Sale Date: {item.detail.auctionDate || format(new Date(item.auctionDate1), 'iii. PPpp')}
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
              {/* <ArrowBackIosIcon sx={{ fontWeight: 700, zIndex: 2, position: 'absolute', bottom: '25px' }} /> */}
              <img style={{ width: '100%', height: 'auto' }} src={image} />
            </Grid>
            <Grid item container xs={12} alignContent="flex-start">
              {item.detail.imgs.small.map((itema, index) => {
                return (
                  <Grid
                    sx={{
                      border: item?.detail.imgs.hd[index] === image ? 1 : 0,
                      padding: '4px',
                      borderRadius: '5px',
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
                      onClick={() => setImage(item?.detail.imgs.hd[index])}
                      style={{
                        borderRadius: 2,
                        width: '100%',
                        height: 'auto',
                        cursor: 'pointer',
                      }}
                      src={itema}
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
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                          {calculation.carPrice}$
                        </Typography>
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
                        <Button
                          sx={{ textTransform: 'capitalize' }}
                          size="small"
                          variant="contained"
                          color="success"
                        >
                          Buy it now
                        </Button>
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
                  <Link to={item.href} target="_blank">
                    Go to copart lot# {item.lot}
                  </Link>
                  <nav aria-label="main mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <Typography sx={{ fontWeight: 700 }}>{item.name} </Typography>
                      </ListItem>
                      <Divider />
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <ListItemText
                            sx={{ '.MuiListItemText-primary': { fontWeight: 600 } }}
                            primary={item.currentBid + '$'}
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
                            primary={item.buyNow}
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
                            primary={item.lot}
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
                            primary={format(new Date(item.detail.creationDate), 'P - hh:mm')}
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
                            sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                            primary={item.title}
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
                            primary={item.odometer}
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
                            primary={item.condition?.slice(0, -4)}
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
                            primary={item.damage.slice(0, -6)}
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
                            primary={item.secondaryDamage || 'unknown'}
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
                            primary={item.detail.color || 'unknown'}
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
                            primary={item.detail.engine || 'unknown'}
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
                            primary={item.detail.cylinders || 'unknown'}
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
                            primary={item.detail.drive || 'unknown'}
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
                            primary={item.detail.keys || 'unknown'}
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
                    {item.detail.saleStatus}
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
                    {item.location || 'unknown'}
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
                    {item.detail.auctionDate || format(new Date(item.auctionDate1), 'iii. PPpp')}
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
                    {date.days}D {date.hours}H {date.minutes}min
                  </Typography>
                </Box>
                <Divider sx={{ width: '100%', maxWidth: 360 }} />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
