import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';

/* eslint-disable no-undef */
const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [activeSession, setActiveSession] = useState(false);

  // ask the db if this user has an active session
  useEffect(() => {
    axiosWithAuth()
      .get(`${BACKEND_URL}/api/user`)
      .then((response) => {
        if (response.data.user) {
          setActiveSession(true);
        }
      })
      .catch((err) => {
        console.log('privateRoute err', err);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (activeSession) {
          return <Component {...props} />;
        } else {
          <Redirect to="/welcome" />;
        }
      }}
    />
  );
};
