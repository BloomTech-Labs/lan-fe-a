import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../actions';
import PageNotFoundContainer from '../common/styles/pageNotFoundStyle';

const Error = props => {
    return (
        <PageNotFoundContainer>
            <h1>There was an error</h1>
            <button onClick={() => props.logOut(props.history)}>Log out</button>
        </PageNotFoundContainer>
    );
};

export default connect(null, { logOut })(Error);