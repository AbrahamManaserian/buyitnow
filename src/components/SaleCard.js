import { Box, Divider, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';

export default function SaleCard({ item, auctionDate }) {
  return (
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
  );
}
