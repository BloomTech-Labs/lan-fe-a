import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/common/landing';
import Register from './components/authentication/register';
import LogIn from './components/authentication/logIn';
import Success from './components/authentication/success';
import PageNotFound from './components/common/pageNotFound';

const App = () => {
	return (
		<Switch>
			<Route exact path='/' component={Landing} />
			{/* <Route path='/login' component={logIn} /> */}
			{/* <Route path='/register' component={register} /> */}
			<Route path='/success' component={Success} />
			<Route component={PageNotFound} />
		</Switch>
	);
};

export default App;
