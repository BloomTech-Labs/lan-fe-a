import React from 'react';
import { Route } from 'react-router-dom';
import landing from './components/common/landing';
import register from './components/authentication/register';
import logIn from './components/authentication/logIn';
import success from './components/authentication/success';

const App = () => {
	return (
		<div>
			<Route exact path='/' component={landing}/>
			<Route path='/login' component={logIn}/>
			<Route path='/register' component={register}/>
			<Route path='/success' component={success}/>
		</div>
	);
};

export default App;
