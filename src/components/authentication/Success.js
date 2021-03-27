import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { fetchUser } from '../../store/actions/index';

const Success = (props) => {
  const { jwt } = useParams();

  // save token to localStorage
  useEffect(() => localStorage.setItem('token', jwt), [jwt]);

  // fetch data for user that just logged in
  useEffect(() => {
    props.fetchUser();
  }, []);

  // render onboarding or nah
  if (props.user.onboarded) {
    props.history.push('/');
  } else {
    props.history.push('/onboarding');
  }

  return (
    <>
      <Loader message={false} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(Success);
