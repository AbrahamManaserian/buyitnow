import { Box, Button, Grid, Typography } from '@mui/material';

export default function CarCard({ mode, image, name, price, highlights, damage, odometer, actual }) {
  const cheCkHighlights = highlights === 'Run and Drive' ? 'R' : 'E';
  console.log(cheCkHighlights);
  return (
    <Box sx={{ width: { xs: '50%', sm: '210px' }, p: '5px' }}>
      <Grid
        sx={{
          width: { xs: '100%', sm: '190px' },
          overflow: 'hidden',
          height: '250px',
          boxShadow: `${mode !== 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgb(245, 245, 245)'} 0 1px 3px`,
          transition: 'all 0.2s ease-out',
          cursor: 'pointer',
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
            style={{ width: '100%', maxWidth: '192px', height: 'auto', borderRadius: '7px' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', pt: '4px', borderBottom: 0.1, height: '35px' }}>
          <Typography
            color={mode === 'dark' ? '#9fa8da' : '#3949ab'}
            sx={{ fontSize: '12px', fontWeight: 700 }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              p: '0 5px 0 5px',
              mb: '3px',
              bgcolor: cheCkHighlights === 'E' ? '#80deea' : '#9ccc65',
              borderRadius: '50%',
            }}
          >
            {cheCkHighlights}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '12px',
            // mb: '3px',
            borderRadius: '50%',
          }}
        >
          {damage} Damage
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            mb: '3px',
            borderRadius: '50%',
          }}
        >
          {odometer} ({actual})
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Button
            sx={{ px: '15px', borderRadius: '15px', textTransform: 'capitalize', height: '22px' }}
            size="small"
            variant="contained"
            color="success"
            ml={1}
          >
            Buy it now
          </Button>
          <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>${price}</Typography>
        </Box>
      </Grid>
    </Box>
  );
}
