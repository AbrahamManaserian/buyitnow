import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { createContext, useCallback, useState } from 'react';
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import BarMenu from './components/BarMenu';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import useGetUser from './components/useGetUser';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          neutral: {
            main: '#757575',
            light: '#eeeeee',
          },
          greenCustome: {
            main: '#00c853',
            light: '#e8f5e9',
          },
          greyCustom: {
            main: '#37474f',
          },

          // palette values for light mode
          // primary: amber,
          // divider: amber[200],
          // text: {
          //   primary: grey[900],
          //   secondary: grey[800],
          // },
        }
      : {
          // palette values for dark mode
          // primary: deepOrange,
          // divider: deepOrange[700],
          neutral: {
            main: '#b0bec5',
            light: '#616161',
          },
          greenCustome: {
            main: '#00c853',
            light: '#454944',
          },
          background: {
            default: '#212121',
            // paper: deepOrange[900],
          },
          greyCustom: {
            main: '#cfd8dc',
          },
          // text: {
          //   primary: '#fff',
          //   secondary: grey[500],
          // },
        }),
  },
  components: {
    mode,
    ...(mode === 'light'
      ? {
          MuiButton: {
            variants: [
              {
                props: { variant: 'custom' },
                style: {
                  textTransform: 'none',
                  color: '#546e7a',
                  padding: '2px 2px 2px 0',
                  fontSize: '15px',
                  borderRadius: '9px',
                  '&:hover': {
                    background: '#eeeeee',
                  },
                },
              },
              {
                props: { variant: 'customHome' },
                style: {
                  margin: '3px',
                  borderStyle: 'solid',
                  borderWidth: 0.2,
                  textTransform: 'none',
                  color: '#546e7a',
                  padding: '2px 6px 2px 6px',

                  '@media (min-width:600px)': {
                    fontSize: '14px',
                    minWidth: '100px',
                  },
                  minWidth: '80px',
                  borderRadius: '9px',
                  fontSize: '12px',
                  // '&:hover': {
                  //   background: '#eeeeee',
                  // },
                },
              },
              // {
              //   props: { variant: 'dashed', color: 'secondary' },
              //   style: {
              //     border: `4px dashed #37474f`,
              //   },
              // },
            ],
          },
          MuiTypography: {
            variants: [
              {
                props: { variant: 'settingsSmall' },
                style: {
                  fontSize: '10px',
                  fontWeight: 600,
                  textDecorationLine: 'underline',
                  textUnderlineOffset: '5px',
                  // color: '#9c27b0',
                },
              },
            ],
          },
          MuiBoxBase: {
            variants: [
              {
                props: { variant: 'link' },
                style: {
                  textDecoration: 'none',
                  color: '#546e7a',
                  '&:hover': {
                    backgroundColor: '#546e7a',
                  },
                },
              },
            ],
          },
        }
      : {
          MuiBoxRoot: {
            variants: [
              {
                props: { variant: 'link' },
                style: {
                  textDecoration: 'none',
                  color: '#e91e63',
                },
              },
            ],
          },
          MuiButton: {
            variants: [
              {
                props: { variant: 'custom' },
                style: {
                  textTransform: 'none',
                  color: '#cfd8dc',
                  padding: '2px 2px 2px 0',
                  fontSize: '15px',
                  borderRadius: '9px',
                  '&:hover': {
                    background: '#616161',
                  },
                },
              },
              {
                props: { variant: 'customHome' },
                style: {
                  margin: '3px',
                  borderStyle: 'solid',
                  borderWidth: 0.2,
                  textTransform: 'none',
                  color: '#cfd8dc',
                  padding: '2px 6px 2px 6px',
                  borderRadius: '9px',
                  '@media (min-width:600px)': {
                    fontSize: '14px',
                    minWidth: '100px',
                  },
                  minWidth: '80px',
                  fontSize: '12px',
                  // '&:hover': {
                  //   background: '#616161',
                  // },
                },
              },
              // {
              //   props: { variant: 'dashed', color: 'secondary' },
              //   style: {
              //     border: `4px dashed '#37474f'`,
              //   },
              // },
            ],
          },
          MuiTypography: {
            variants: [
              {
                props: { variant: 'settingsSmall' },
                style: {
                  fontSize: '10px',
                  fontWeight: 600,
                  textDecorationLine: 'underline',
                  textUnderlineOffset: '5px',
                  // color: '#ba68c8',
                },
              },
            ],
          },
        }),
  },
});
export const AppContext = createContext();
function App() {
  let user = useGetUser();
  const [language, setLanguage] = useState(localStorage.getItem('language') || '1');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') || 'dark');
  const theme = createTheme(getDesignTokens(darkMode || 'dark'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          language: language,
          setLanguage: setLanguage,
          darkMode: darkMode,
          setDarkMode: setDarkMode,
          user: user,
        }}
      >
        <Grid item xs container alignItems="flex-start">
          <SideBar open="none" />
          <Grid sx={{ minHeight: '100vh' }} alignContent="space-between" item xs container>
            <Grid item xs container>
              <BarMenu />
              <Outlet />
            </Grid>
            <Footer mode={darkMode} />
          </Grid>
        </Grid>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
