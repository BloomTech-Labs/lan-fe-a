import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './utils/privateRoute';
import Landing from './components/common/landing';
import Register from './components/authentication/register';
import LogIn from './components/authentication/logIn';
import Success from './components/authentication/success';
import Onboarding from './components/authentication/onboarding';
import CareerCoach from './components/authentication/careerCoach';
import PageNotFound from './components/common/pageNotFound';

const App = () => {
	return (
		<Switch>
			<Route exact path='/' component={Landing} />
			{/* <Route path='/login' component={logIn} /> */}
			{/* <Route path='/register' component={register} /> */}
			<Route path='/success' component={Success} />
			<PrivateRoute exact path='/onboarding' component={Onboarding} />
			<PrivateRoute exact path='/onboarding/careercoach' component={CareerCoach} />
			<Route component={PageNotFound} />
		</Switch>
	);
};

export default App;
