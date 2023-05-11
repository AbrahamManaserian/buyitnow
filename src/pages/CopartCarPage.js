import { useLocation, useParams } from 'react-router-dom';
import { CarsContext } from './CopartCars';
import { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

export default function CopartCarPage() {
  const url = new URL(window.location.href);
  const [item, setItem] = useState({});
  const [image, setImage] = useState('');
  const cars = useContext(CarsContext);
  useEffect(() => {
    const filteredItem = cars.find((item) => item.lot === url.searchParams.get('lot'));
    if (filteredItem) {
      setItem(filteredItem);
      setImage(filteredItem?.img);
    }
  }, [cars]);
  //   console.log(cars.find((item) => item.lot === url.searchParams.get('lot')));

  //   console.log(item);
  return (
    <Grid item container xs={12} p={1}>
      <Grid item container xs={12} sm={6}>
        <Grid item container xs={12} pb={1}>
          <Typography color="primary" sx={{ width: '100%', fontWeight: 500 }}>
            {item.name}{' '}
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>{item.detail?.drive} </Typography>

          <img style={{ width: '100%', height: 'auto' }} src={image} />
        </Grid>
        <Grid columnSpacing={1} item container xs={12}>
          {item.detail &&
            item.detail.imgs.small.map((itema, index) => {
              return (
                <Grid key={index} item xs={3}>
                  <img
                    onClick={() => setImage(item?.detail.imgs.hd[index])}
                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                    src={itema}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
}
