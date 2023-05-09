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
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../SVGIcons';
import { textSignInUp } from '../texts';
import { AppContext } from '../App';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { Backdrop, CircularProgress } from '@mui/material';

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

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const context = React.useContext(AppContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const location = useLocation();
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.get('firstName') + ' ' + data.getAll('lastName'),
        });
        // console.log(user);
        navigate(`/${location.search.slice(2)}`);
        setLoading(false);
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorCode);
        // ..
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
            {getText('signUp')}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* <Box sx={{ mt: 3 }}> */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={getText('name')}
                  // autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={getText('srName')}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={() => setError()}
                  error={error === 'auth/invalid-email' || error === 'auth/email-already-in-use'}
                  required
                  fullWidth
                  id="email"
                  label={getText('email')}
                  name="email"
                  autoComplete="email"
                  helperText={
                    error === 'auth/invalid-email' || error === 'auth/email-already-in-use'
                      ? 'email-already-in-use'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={() => setError()}
                  error={error === 'auth/weak-password'}
                  required
                  fullWidth
                  name="password"
                  label={getText('password')}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={error === 'auth/weak-password' ? 'at leat 6 characters' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label={getText('getNot')}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {getText('signUp')}
            </Button>
            <Button type="submit" fullWidth variant="outlined" sx={{ mb: 2, textTransform: 'none' }}>
              <Box sx={{ display: 'flex', paddingRight: '25px' }}>
                <GoogleIcon />
              </Box>
              {getText('signUpGoogle')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}
                <Link style={{ fontSize: '14px' }} component={RouterLink} to={`/signin/${location.search}`}>
                  {getText('haveAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Grid>
  );
}
