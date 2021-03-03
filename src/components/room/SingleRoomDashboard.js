import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchPostByRoom, fetchPostByRoomByPopular, fetchRooms } from '../../store/actions';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import RoomBody from './RoomBody';

const StyledRoomDashboard = styled.div`
    display: flex;
    /* width: 98%; */
`;

const SingleRoomDashboard = (props) => {
  const [sortValue, setSortValue] = useState('Recent');
  let { id, page } = useParams();
  useEffect(() => {
    props.fetchRooms();
  }, []);
  useEffect(() => {
    if(sortValue == 'Recent') {
      props.fetchPostByRoom(id, page);
    } else {
      props.fetchPostByRoomByPopular(id, page);
    }
  }, [id, page]);
  return (
    <div>
      <Header history={props.history} />
      <StyledRoomDashboard>
        <Sidebar />
        <RoomBody rooms={props.rooms} id={id} page={page} sortValue={sortValue} setSortValue={setSortValue} />
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

export default connect(mapStateToProps, { fetchPostByRoom, fetchPostByRoomByPopular, fetchRooms })(SingleRoomDashboard);
