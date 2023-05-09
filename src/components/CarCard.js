import { Box, Button, Grid, Typography } from '@mui/material';

export default function CarCard({
  mode,
  href,
  image,
  name,
  lot,
  price,
  highlights,
  damage,
  odometer,
  buyNow,
}) {
  const cheCkHighlights = highlights === 'Run and Drive Icon' ? 'R' : 'E';
  // console.log(cheCkHighlights);
  return (
    <Box sx={{ width: { xs: '50%', sm: '220px' }, p: '5px' }}>
      <Grid
        sx={{
          width: { xs: '100%', sm: '200px' },
          overflow: 'hidden',
          // height: '350px',
          boxShadow: `${mode !== 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgb(245, 245, 245)'} 0 1px 3px`,
          transition: 'all 0.2s ease-out',
          // cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.02,1.02)',
          },
          display: 'flex',
          flexDirection: 'column',
          p: '5px',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '132px',
            overflow: 'hidden',
            alignContent: 'flex-start',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderRadius: '7px',
          }}
        >
          <img
            src={image}
            style={{ width: '100%', maxWidth: '222px', height: '100%', borderRadius: '7px' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: '4px',
            overflow: 'hidden',
            borderBottom: 0.1,
            height: '45px',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            color={mode === 'dark' ? '#9fa8da' : '#3949ab'}
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              height: '40px',
              overflow: 'hidden',
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              p: '0 5px 0 5px',
              m: '5px 0 8px 2px',
              bgcolor: cheCkHighlights === 'E' ? '#80deea' : '#9ccc65',
              borderRadius: '50%',
            }}
          >
            {cheCkHighlights}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{
              fontSize: '12px',
              // p: '0 5px 0 5px',
              // m: '5px 0 8px 2px',
              // bgcolor: cheCkHighlights === 'E' ? '#80deea' : '#9ccc65',
              // borderRadius: '50%',
            }}
          >
            Lot#
          </Typography>
          <Typography color="primary.main" sx={{ fontSize: '12px', pl: '5px' }}>
            {' '}
            {lot ? lot : '23445545'}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '14px',
            height: '20px',
            fontWeight: 500,
            // mb: '3px',
            overflow: 'hidden',
          }}
        >
          {damage} Damage
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            mb: '3px',
          }}
        >
          {odometer}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            // height: '50px',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              mb: '3px',
              fontWeight: 600,
            }}
          >
            Current Bid
          </Typography>

          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>${price}</Typography>
        </Box>
        <Button
          sx={{
            visibility: !buyNow ? 'hidden' : 'flex',
            p: '10px',
            borderRadius: '15px',
            textTransform: 'capitalize',
            height: '22px',
            minWidth: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            overflow: 'hidden',
            fontSize: '15px',
            my: '5px',
          }}
          size="small"
          variant="contained"
          color="success"
          ml={1}
        >
          Buy now
          <Typography sx={{ fontSize: '15px', fontWeight: 600, pl: '2px' }}>-</Typography>
          <Typography sx={{ fontSize: '15px', fontWeight: 600, pl: '2px' }}>{buyNow}</Typography>
        </Button>
      </Grid>
    </Box>
  );
}
