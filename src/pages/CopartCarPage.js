import { Link, useLocation, useParams } from 'react-router-dom';
import { CarsContext } from './CopartCars';
import { useContext, useEffect, useState } from 'react';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
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

export function BasicList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem
            disablePadding
            secondaryAction={
              <Typography edge="end" aria-label="comments">
                Abraha,
              </Typography>
            }
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Divider />
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
export default function CopartCarPage({ carItems }) {
  // console.log(format(Date.now(), 'MM/dd/yyyy - H:mm:ss'));
  const url = new URL(window.location.href);
  const [item, setItem] = useState({});
  const [image, setImage] = useState('');
  const cars = useContext(CarsContext);
  const [date, setDate] = useState({});
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
  console.log(item);
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
                    // m: '-8px 0 0 -8px',
                    p: '8px',
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: 'white' }}>Calculation To Armenia</Typography>
                </Box>
                <Grid p={2} item xs={12} container>
                  <Grid item xs={6} direction="column" container pr={{ xs: 1, sm: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                      <Typography>Car Price -</Typography>
                      <Typography sx={{ fontWeight: 500, pl: '2px' }}>{item.buyNow.slice(1)}$</Typography>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                      <Typography>Fob -</Typography>
                      <Typography sx={{ fontWeight: 500, pl: '2px' }}>1,000$</Typography>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                      <Typography>Shipment -</Typography>
                      <Typography sx={{ fontWeight: 500, pl: '2px' }}>2,500$</Typography>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', py: '4px' }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Customs clearance:</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                        <Typography>AAH -</Typography>
                        <Typography sx={{ fontWeight: 500, pl: '2px' }}>6,500$</Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                        <Typography>Maqsaturq -</Typography>
                        <Typography sx={{ fontWeight: 500, pl: '2px' }}>4,500$</Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                        <Typography>Total -</Typography>
                        <Typography sx={{ fontWeight: 500, pl: '2px' }}>11,100$</Typography>
                      </Box>
                      <Divider sx={{ width: '100%' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={6} direction="column" container pl={{ xs: 1, sm: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                      <Typography>Car Price -</Typography>
                      <Typography sx={{ fontWeight: 500, pl: '2px' }}>{item.buyNow.slice(1)}$</Typography>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                      <Typography>Fob -</Typography>
                      <Typography sx={{ fontWeight: 500, pl: '2px' }}>1,000$</Typography>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '4px' }}>
                      <Typography>Shipment -</Typography>
                      <Typography sx={{ fontWeight: 500, pl: '2px' }}>2,500$</Typography>
                    </Box>
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
