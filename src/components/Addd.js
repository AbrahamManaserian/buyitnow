import { Box, Button, Typography } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from 'react-router-dom';
export default function ({
  name,
  season,
  mode,
  getText,
  price,
  diameter,
  height,
  width,
  imgUrl,
  id,
  widthBox,
}) {
  return (
    <Box
      sx={{
        //   rgb(245, 245, 245)
        width: { xs: '48%', sm: '180px' },
        minWidth: widthBox,
        overflow: 'hidden',
        height: '321px',
        boxShadow: `${mode !== 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgb(245, 245, 245)'} 0 1px 3px`,
        // borderStyle: 'solid',
        // borderWidth: '1px',
        transition: 'all 0.2s ease-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02,1.02)',
        },
        display: 'flex',
        flexDirection: 'column',
        p: '5px',
        margin: { xs: '6px 1px 6px 1px', sm: '7px' },

        borderRadius: '10px',
      }}
    >
      {' '}
      <Link to={`/tyres/${id}`} className="cardlink">
        <Box
          sx={{
            display: 'flex',
            height: '172px',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={imgUrl}
            style={{ width: '100%', maxWidth: '172px', height: 'auto', borderRadius: '7px' }}
          />
        </Box>
        <Box
          sx={{
            height: '40px',
            display: 'flex',
            alignItems: 'flex-end',
            marginTop: '5px',
            overflow: 'hidden',
            //   textOverflow: 'ellipsis',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              // height: '50px',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginTop: '5px', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '13px', paddingRight: '10px' }}>
            {width}/{height}/R{diameter}
          </Typography>
          {season === 'summer' ? <LightModeOutlinedIcon sx={{ color: '#fbc02d' }} fontSize="small" /> : null}
          {season === 'winter' ? <AcUnitIcon color="primary" fontSize="13px" /> : null}
        </Box>
        <Box
          sx={{
            display: 'flex',
            //   p: '2px',
            marginTop: '5px',
            alignItems: 'center',
            borderTop: 1,
            borderWidth: 0.1,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {price}
          </Typography>
          <Typography fontWeight={700} sx={{ fontSize: '10px', paddingRight: '5px', fontWeight: 400 }}>
            {id}
          </Typography>
        </Box>
      </Link>
      <Button
        // onClick={() => setChooseTyre('tyre')}
        variant="contained"
        color="success"
        size="small"
        sx={{
          borderRadius: '10px',
          //   m: '0 2px 0 2px',
          textTransform: 'none',
          fontSize: { xs: '12px', sm: '13px' },
        }}
      >
        {getText('addCart')}
      </Button>
    </Box>
  );
}
