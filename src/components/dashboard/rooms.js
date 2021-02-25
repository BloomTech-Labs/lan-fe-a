import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions';
import Sidebar from '../common/sidebar';
import Room from './roomCard';
import PostsContainer from './styles/postsStyle';
import styled from 'styled-components';


const RoomWrapper = styled.div`
  display: flex;
  width: 95%;
  flex-wrap: wrap;
`;

const Rooms = (props) => {
  useEffect(() => {
    props.fetchRooms();
  }, []);

  return (
    <RoomWrapper>
      <Sidebar />
      <PostsContainer>
        {props.rooms.length > 0 ? (
          props.rooms.map((item, index) => <Room key={index} room={item} />)
        ) : (
          <div className="no-posts-found">
            <p>
              <i className="fas fa-exclamation"></i>No Rooms found
            </p>
          </div>
        )}
      </PostsContainer>
    </RoomWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { fetchRooms })(Rooms);
