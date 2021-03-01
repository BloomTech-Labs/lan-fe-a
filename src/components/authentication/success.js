import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { success } from '../../store/actions';
import Loader from '../common/Loader';

const Success = props => {
  useEffect(() => props.success(props.history), []);

  return (
    <>
      <Loader message={false} />
    </>
  );
};

export default connect(null, { success })(Success);