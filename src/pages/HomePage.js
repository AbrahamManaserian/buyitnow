import { Button, Grid, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import Image1 from '../images/33.jpeg';
import Todos from './Todos';

export default function HomePage() {
  const context = useContext(AppContext);

  return (
    <div>
      <img style={{ width: '100%', height: 'auto' }} src={Image1} />
    </div>
  );
}
