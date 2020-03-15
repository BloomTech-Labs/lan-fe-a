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
			<Route exact path='/' component={Landing}/>
			<Route path='/login' component={LogIn}/>
			<Route path='/register' component={Register}/>
			<Route path='/faq' component={FAQ}/>
		</div>
	);
};

export default App;
