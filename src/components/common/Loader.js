import React from 'react';
import LoaderContainer from './styles/loaderStyle';
import loader from '../../img/loader.png';

const Loader = (props) => {
  return (
    <LoaderContainer message={props.message}>
      <img src={loader} alt="loader" />
      {props.message && <p>Wakey wakey server!</p>}
    </LoaderContainer>
  );
};

export default Loader;
