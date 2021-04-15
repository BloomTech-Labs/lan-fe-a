import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { fetchUser } from '../../store/actions/index';
import toast from 'react-hot-toast';

const Success = (props) => {
  const { jwt } = useParams();

  // save token to localStorage
  useEffect(() => {
    localStorage.setItem('token', jwt);
    props.fetchUser();
  }, [jwt]);

  // fetch data for user that just logged in
  // useEffect(() => {
  //   props.fetchUser();
  //   }, []);

  // render onboarding or nah
  if (props.user.onboarded) {
    toast.success('Welcome to the Lambda Alumni Network!');
    props.history.push('/');
  } else {
    toast.success('Welcome to the Lambda Alumni Network!');
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
