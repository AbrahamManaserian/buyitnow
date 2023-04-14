import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import CustomersPage from './pages/CustomersPage';
import PartnersPage from './pages/PartnersPage';
import NewsPage from './pages/NewsPage';
import CopartCars from './pages/CopartCars';
import IaaiCars from './pages/IaaiCars';
import OnRoad from './pages/OnRoad';
import InArmeniaCars from './pages/InArmeniaCars';
import InGeorgiaCars from './pages/InGeorgiaCars';
import EuropeCars from './pages/EuropeCars';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/signIn',
        element: <SigninPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/customers',
        element: <CustomersPage />,
      },
      {
        path: '/news',
        element: <NewsPage />,
      },
      {
        path: '/europe-cars',
        element: <EuropeCars />,
      },
      {
        path: '/copart-cars',
        element: <CopartCars />,
      },
      {
        path: '/iaai-cars',
        element: <IaaiCars />,
      },
      {
        path: '/in-georgia',
        element: <InGeorgiaCars />,
      },
      {
        path: '/in-armenia',
        element: <InArmeniaCars />,
      },
      {
        path: '/on-road',
        element: <OnRoad />,
      },
      {
        path: '/partners',
        element: <PartnersPage />,
      },
      {
        path: '/about/asd',
        element: <div>Anasunikkk</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <App />
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
