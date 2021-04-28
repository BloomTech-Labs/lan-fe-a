// third party
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// styles
import './App.less';

// old UI - pages and components
import { PrivateRoute } from './utils/privateRoute';
import { Toaster } from 'react-hot-toast';
import Landing from './components/common/Landing';
import Success from './components/authentication/Success';

// new UI - pages and components
import Dashboard from './components/common/Dashboard';
import OnboardingPage from './components/common/OnboardingPage';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/welcome" component={Landing} />
        <Route path="/success/:jwt" component={Success} />
        <PrivateRoute path="/onboarding" component={OnboardingPage} />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
      <Toaster
        position="bottom"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: '2px solid #62d347',
            },
          },
          error: {
            style: {
              border: '2px solid #f94f4f',
            },
          },
        }}
      />
    </>
  );
};

export default App;
