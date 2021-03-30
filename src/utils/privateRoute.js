import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import toast from 'react-hot-toast';

/* eslint-disable no-undef */
const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [activeToken, setActiveToken] = useState(false);

  // ask the db if this user has an active token
  useEffect(() => {
    axiosWithAuth()
      .get(`${BACKEND_URL}/api/user`)
      .then((response) => {
        if (response.data.user) {
          setActiveToken(true);
        }
      })
      .catch((error) => {
        localStorage.removeItem('token');
        toast.error(error.message);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (activeToken) {
          return <Component {...props} />;
        } else {
          <Redirect to="/welcome" />;
        }
      }}
    />
  );
};
