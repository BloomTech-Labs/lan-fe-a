import React from 'react';
import {Route} from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import FAQ from './components/FAQ';
import Register from './components/Register';
import LogIn from './components/LogIn';

const App = () => {
	return (
		<div>
			<Route path='/' component={Header}/>
			<Route exact path='/' component={Landing}/>
			<Route path='/faq' component={FAQ}/>
			<Route path='/register' component={Register}/>
			<Route path='/login' component={LogIn}/>
		</div>
	);
};

export default App;
