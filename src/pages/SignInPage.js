import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoogleIcon } from '../SVGIcons';
import { textSignInUp } from '../texts';
import { AppContext } from '../App';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Backdrop, CircularProgress } from '@mui/material';
import { auth } from '../firebase';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://buyitnow.am/">
        https://buyitnow.am/
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth1 = auth;
  const context = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [error, seteError] = React.useState();
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    signInWithEmailAndPassword(auth1, data.get('email'), data.get('password'))
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        const user = userCredential.user;
        navigate(`/${location.search.slice(2)}`);
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        seteError(errorCode);
      });
  };

  const getText = (text) => {
    if (context.language === '1') {
      return textSignInUp[text].am;
    } else if (context.language === '2') {
      return textSignInUp[text].en;
    } else {
      return textSignInUp[text].ru;
    }
  };
  return (
    <Grid item container xs={12}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            // onClick={()=>setLoading(false)}
          >
            {' '}
            <CircularProgress color="inherit" />
          </Backdrop>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {getText('signIn')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={() => seteError(false)}
              error={!!error && error !== 'auth/wrong-password'}
              margin="normal"
              required
              fullWidth
              id="email"
              label={getText('email')}
              name="email"
              autoComplete="email"
              // autoFocus
              helperText={error && error !== 'auth/wrong-password' ? 'Incorrect entry.' : ''}
            />
            <TextField
              error={error === 'auth/wrong-password'}
              onChange={() => seteError(false)}
              margin="normal"
              required
              fullWidth
              name="password"
              label={getText('password')}
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={error === 'auth/wrong-password' ? 'Incorrect entry.' : ''}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={getText('remember')}
            />
            {/* <Link
              component={RouterLink}
              to={`/${location.search.slice(2)}`}
              style={{ textDecoration: 'none' }}
            > */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {getText('signIn')}
            </Button>
            {/* </Link> */}
            <Button type="submit" fullWidth variant="outlined" sx={{ mb: 2, textTransform: 'none' }}>
              <Box sx={{ display: 'flex', paddingRight: '25px' }}>
                <GoogleIcon />
              </Box>
              {getText('signInGoogle')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {getText('forgotPassword')}
                </Link>
              </Grid>
              <Grid item>
                <Link style={{ fontSize: '14px' }} component={RouterLink} to={`/signup/${location.search}`}>
                  {getText('noAcount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Grid>
  );
}
