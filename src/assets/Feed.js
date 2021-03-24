import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecent } from '../store/actions';

const Feed = (props) => {
  return <h2>Feed</h2>;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { fetchRecent })(Feed);
