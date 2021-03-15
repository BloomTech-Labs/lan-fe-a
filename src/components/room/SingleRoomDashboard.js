import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  fetchPostByRoom,
  fetchRooms,
} from '../../store/actions';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import RoomBody from './RoomBody';

const StyledRoomDashboard = styled.div`
  display: flex;
`;

const SingleRoomDashboard = (props) => {
  const [sortValue, setSortValue] = useState('Recent');
  let { id, page } = useParams();
  useEffect(() => {
    props.fetchRooms();
  }, []);
  useEffect(() => {
    if (sortValue == 'Recent') {
      props.fetchPostByRoom(id, 'posts.created_at', page);
    } else {
      props.fetchPostByRoom(id, 'posts.likes', page);
    }
  }, [id, page]);
  return (
    <div>
      <Header history={props.history} />
      <StyledRoomDashboard>
        <Sidebar />
        <RoomBody
          rooms={props.rooms}
          id={id}
          page={page}
          sortValue={sortValue}
          setSortValue={setSortValue}
        />
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

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
})(SingleRoomDashboard);
