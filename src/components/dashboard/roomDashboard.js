import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import Room from './room';
import { fetchPostByRoom, fetchRooms } from '../../actions';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledRoomDashboard = styled.div`
    display: flex;
`;

const RoomDashboard = (props) => {
  let { id } = useParams();
  useEffect(() => {
    props.fetchRooms();
  }, []);
  useEffect(() => {
    props.fetchPostByRoom(id);
  }, [id]);
  return (
    <div>
      <Header history={props.history} />
      <StyledRoomDashboard>
        <Sidebar />
        <Room rooms={props.rooms} id={id} />
      </StyledRoomDashboard>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { fetchPostByRoom, fetchRooms })(RoomDashboard);
