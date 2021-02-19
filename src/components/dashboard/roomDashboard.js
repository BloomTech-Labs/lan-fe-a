import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import Room from './room';
import { fetchPostByRoom } from '../../actions';
import { useParams } from 'react-router-dom';

const RoomDashboard = (props) => {
  let { id } = useParams();
  useEffect(() => {
    props.fetchPostByRoom(id);
  }, [id]);
  return (
    <div>
      <Header history={props.history} />
      <Sidebar />
      <Room id={id} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { fetchPostByRoom })(RoomDashboard);
