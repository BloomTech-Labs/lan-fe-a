import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.less';
import { PrivateRoute } from './utils/privateRoute';
import { Toaster } from 'react-hot-toast';
import AllRoomsDashboard from './components/allRoomsDashboard/AllRoomsDashboard';
import Landing from './components/common/Landing';
import Success from './components/authentication/Success';
import Onboarding from './components/onboarding/Onboarding';
import Post from './components/post/Post';
import User from './components/user/UserProfile';
import Settings from './components/user/UserSettings';
import AdminSettings from './components/adminMod/AdminSettings';
import ModSettings from './components/adminMod/ModSettings';
import FAQ from './components/common/FAQ';
import PageNotFound from './components/common/PageNotFound';
import SingleRoomDashboard from './components/room/SingleRoomDashboard';
import FullSearchResults from './components/search/FullSearchResults';

import SampleStyles from './assets/SampleStyles';

const App = () => {
  return (
    <>
      <Switch>
        {/* <Route path="/sample/:id" component={SampleStyles} /> */}
        <Route path="/sample" component={SampleStyles} />
        <PrivateRoute exact path="/" component={AllRoomsDashboard} />
        <Route path="/welcome" component={Landing} />
        <Route path="/success" component={Success} />
        <PrivateRoute exact path="/onboarding" component={Onboarding} />
        <PrivateRoute path="/post/:id" component={Post} />
        <PrivateRoute
          path="/room/:id/page/:page"
          component={SingleRoomDashboard}
        />
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
