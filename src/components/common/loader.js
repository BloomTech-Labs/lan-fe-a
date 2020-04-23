import React from 'react';
import LoaderContainer from './styles/loaderStyle';
import loadingicon from '../../img/loading-icon.png';

const Loader = props => {
    return (
        <LoaderContainer message={props.message}>
            <img src={loadingicon} alt='loading icon' />
            {props.message && <p>Wakey wakey server!</p>}
        </LoaderContainer>
    );
};

export default Loader;