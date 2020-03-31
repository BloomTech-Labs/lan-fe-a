import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { success } from '../../actions';
import SuccessContainer from './styles/successStyle';
import loadingicon from '../../img/loading-icon.png';

const Success = props => {
    useEffect(() => props.success(props.history), []);

    return (
        <SuccessContainer>
            <img src={loadingicon} alt='loading icon' />
        </SuccessContainer>
    );
};

export default connect(null, { success })(Success);