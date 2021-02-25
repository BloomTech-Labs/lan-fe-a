import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './utils/privateRoute';
import Dashboard from './components/dashboard/dashboard';
import Landing from './components/common/landing';
import Success from './components/authentication/success';
import Onboarding from './components/onboarding/onboarding';
import CareerCoach from './components/onboarding/careerCoach';
import CreatePost from './components/post/createPost';
import Post from './components/post/post';
import User from './components/user/user';
import Settings from './components/user/settings';
import AdminSettings from './components/user/adminSettings';
import ModSettings from './components/user/modSettings';
import FAQ from './components/common/faq';
import Error from './components/authentication/error';
import PageNotFound from './components/common/pageNotFound';
import RoomDashboard from './components/dashboard/roomDashboard';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/welcome" component={Landing} />
        <Route path="/success" component={Success} />
        <PrivateRoute exact path="/onboarding" component={Onboarding} />
        <PrivateRoute path="/onboarding/careercoach" component={CareerCoach} />
        <PrivateRoute exact path="/post" component={CreatePost} />
        <PrivateRoute path="/post/:id" component={Post} />
        <PrivateRoute path="/room/:id" component={RoomDashboard} />
        <PrivateRoute path="/user/:id" component={User} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path='/admin-settings' component={AdminSettings}/>
        <PrivateRoute path='/mod-settings' component={ModSettings}/>
        <PrivateRoute path="/faq" component={FAQ} />
        <PrivateRoute path="/error" component={Error} />
        <Route component={PageNotFound} />
      </Switch>
      <Toaster 
        position='bottom'
        reverseOrder={false}
      />
    </>
  );
};

export default App;
