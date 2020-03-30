import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { success, logOut } from '../../actions';
import SuccessContainer from './styles/successStyle';
import loadingicon from '../../img/loading-icon.png';

const Success = props => {
    useEffect(() => props.success(props.history), []);

    return (
        <SuccessContainer>
            <img src={loadingicon} alt='loading icon' onClick={() => props.logOut(props.history)} />
        </SuccessContainer>
    );
};

export default connect(null, { success, logOut })(Success);