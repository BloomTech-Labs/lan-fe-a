import React from 'react';
import LoaderContainer from './styles/loaderStyle';
import loadingicon from '../../img/loading-icon.png';

const Loader = () => {
    return (
        <LoaderContainer>
            <img src={loadingicon} alt='loading icon' />
            <p>Wakey wakey server!</p>
        </LoaderContainer>
    );
};

export default Loader;