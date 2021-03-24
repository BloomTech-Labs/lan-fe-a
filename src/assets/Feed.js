import React from 'react';
import { connect } from 'react-redux';
import { fetchRecent } from '../store/actions';

const Feed = () => {
  return <h2>Feed</h2>;
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { fetchRecent })(Feed);
