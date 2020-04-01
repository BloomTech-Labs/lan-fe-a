import React from 'react';
import Header from './header';
import Filter from './filter';
import Questions from './questions';

const Dashboard = props => {
    return (
        <>
            <Header history={props.history} />
            <Filter history={props.history} />
            <Questions />
        </>
    );
};

export default Dashboard;