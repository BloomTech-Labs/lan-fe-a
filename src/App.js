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
import Post from './components/post/Post';
import User from './components/user/UserProfile';
import Settings from './components/user/UserSettings';
import AdminSettings from './components/adminMod/AdminSettings';
import ModSettings from './components/adminMod/ModSettings';
import FAQ from './components/common/FAQ';
import PageNotFound from './components/common/PageNotFound';
import SingleRoomDashboard from './components/room/SingleRoomDashboard';
import FullSearchResults from './components/search/FullSearchResults';


// new UI - pages and components
import Dashboard from './assets/Dashboard';
import OnboardingPage from './assets/pages/OnboardingPage/OnboardingPage';

const App = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/welcome" component={Landing} />
        <Route path="/success/:jwt" component={Success} />
        <PrivateRoute path="/onboarding" component={OnboardingPage} />
        <PrivateRoute path="/post/:id" component={Post} />
        <PrivateRoute path="/room/:id/page/:page" component={SingleRoomDashboard} />
        <PrivateRoute path="/full-search" component={FullSearchResults} />
        <PrivateRoute path="/user/:id" component={User} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/admin-settings" component={AdminSettings} />
        <PrivateRoute path="/mod-settings" component={ModSettings} />
        <PrivateRoute path="/faq" component={FAQ} />
        <Route component={PageNotFound} />
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
