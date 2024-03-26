import { Box, Button, Grid, Typography } from '@mui/material';
import { differenceInHours, format, formatDistance, formatDistanceToNow, intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const PositionedTypography = styled(Typography)(({ theme, datedistance }) => ({
  position: 'absolute',
  top: '13px',
  zIndex: 1,
  backgroundColor: 'red',
  borderRadius: '25px',
  padding: '0 5px 0 5px',
  fontSize: '13px',
  fontWeight: 600,
  color: 'white',
  visibility: datedistance >= 24 ? 'hidden' : '',
  [theme.breakpoints.up('xs')]: {
    right: '13px',
  },
  [theme.breakpoints.up('sm')]: {
    right: '23px',
  },
}));
const CardContainer = styled(Grid)(({ theme, mode }) => ({
  overflow: 'hidden',
  boxShadow: `${mode !== 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgb(245, 245, 245)'} 0 1px 3px`,
  transition: 'all 0.2s ease-out',
  '&:hover': {
    transform: 'scale(1.02,1.02)',
  },
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  borderRadius: '10px',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '230px',
  },
}));
const ImageBox = styled(Box)(({ theme, mode }) => ({
  display: 'flex',
  height: { xs: '136px', sm: '170px' },
  overflow: 'hidden',
  alignContent: 'flex-start',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderRadius: '7px',
  [theme.breakpoints.up('xs')]: {
    height: '136px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '170px',
  },
}));
const FlexBox1 = styled(Box)(({ theme, mode }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '4px',
  overflow: 'hidden',
  height: '45px',
  justifyContent: 'space-between',
}));
const Typography1 = styled(Typography)(({ theme, mode }) => ({
  fontSize: '14px',
  fontWeight: 700,
  height: '40px',
  overflow: 'hidden',
}));
const Typography2 = styled(Typography)(({ theme, checkhighlights }) => ({
  fontSize: '12px',
  padding: '0 5px 0 5px',
  margin: '5px 0 8px 2px',
  backgroundColor: checkhighlights === 'E' ? '#80deea' : '#9ccc65',
  borderRadius: '50%',
}));
const Typography3 = styled(Typography)(({ theme, checkhighlights }) => ({
  fontSize: '14px',
  height: '20px',
  fontWeight: 500,
  overflow: 'hidden',
}));
const Button1 = styled(Button)(({ theme, checkhighlights, buynow }) => ({
  visibility: !buynow ? 'hidden' : 'flex',
  padding: '10px',
  borderRadius: '10px',
  textTransform: 'capitalize',
  height: '22px',
  minWidth: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  overflow: 'hidden',
  fontSize: '15px',
  margin: '5px 0 5px 0',
}));

export default function CarCard({
  mode,
  image,
  name,
  lot,
  price,
  highlights,
  damage,
  odometer,
  buyNow,
  auctionDate,
  url,
  creationDate,
}) {
  const cheCkHighlights = highlights === 'Run & Drive Verified' ? 'R' : 'E';
  // console.log(timeDifference);
  let date = {};
  if (new Date() - auctionDate < 0) {
    date = intervalToDuration({
      start: new Date(),
      end: auctionDate,
    });
  } else if (new Date() - auctionDate > 4 * 3600 * 1000) {
    date.starts = 'Auction ended';
  } else {
    date.starts = 'Auction startes';
  }

  // console.log(auctionDate);
  const dateDistance = differenceInHours(new Date(), new Date(creationDate));
  //   console.log(date);
  return (
    <Box sx={{ width: { xs: '50%', sm: '250px' }, p: '5px', position: 'relative' }}>
      <PositionedTypography datedistance={dateDistance}>New</PositionedTypography>
      <Link to={`${url}lot=${lot}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContainer mode={mode}>
          <ImageBox>
            <img src={image} style={{ width: '100%', height: 'auto', borderRadius: '7px' }} />
          </ImageBox>
          <FlexBox1
            sx={{
              borderBottom: 0.1,
            }}
          >
            <Typography1 color={mode === 'dark' ? '#9fa8da' : '#3949ab'}>{name}</Typography1>
            <Typography2 checkhighlights={cheCkHighlights}>{cheCkHighlights}</Typography2>
          </FlexBox1>
          <Typography color="error" sx={{ fontSize: '13px', fontWeight: 500 }}>
            Added {formatDistanceToNow(new Date(creationDate), { addSuffix: true })}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography fontSize="12px">Lot#</Typography>
            <Typography color="primary.main" sx={{ fontSize: '12px', pl: '5px' }}>
              {lot ? lot : '23445545'}
            </Typography>
          </Box>
          <Typography3>{damage} Damage</Typography3>
          <Typography3>{odometer}</Typography3>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Current Bid
            </Typography>

            <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>${price}0</Typography>
          </Box>
          <Button1
            sx={{ fontSize: '13px', justifyContent: 'center' }}
            buynow={buyNow}
            size="small"
            variant="contained"
            color="success"
            ml={1}
          >
            Buy now
            <Typography sx={{ fontSize: '13px', fontWeight: 600, pl: '2px' }}>-</Typography>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, pl: '2px' }}>${buyNow}0</Typography>
          </Button1>
          <Typography color={!date.starts ? 'error' : 'info.dark'} sx={{ fontSize: '13px', fontWeight: 500 }}>
            {!date.starts
              ? 'Auction in ' + date.days + 'D ' + date.hours + 'H ' + date.minutes + 'min'
              : date.starts}
          </Typography>
        </CardContainer>
      </Link>
    </Box>
  );
}
