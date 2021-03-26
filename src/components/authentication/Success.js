import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { success } from '../../store/actions';
import Loader from '../common/Loader';

const Success = (props) => {
  const { jwt } = useParams();
  useEffect(() => props.success(props.history, jwt), []);

  return (
    <>
      <Loader message={false} />
    </>
  );
};

export default connect(null, { success })(Success);
