import React, { useEffect } from 'react';
import SuccessContainer from './styles/successStyle';
import loadingicon from '../../img/loading-icon.png';

const Success = props => {
    useEffect(() => {
        
    }, []);

    return (
        <SuccessContainer>
            <img src={loadingicon} alt='loading icon' />
        </SuccessContainer>
    );
};

export default Success;