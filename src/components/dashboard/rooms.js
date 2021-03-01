import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions';
import Sidebar from '../common/sidebar';
import Room from './roomCard';
import styled from 'styled-components';


const RoomWrapper = styled.div`
  display: flex;
  width: 98%;
  flex-wrap: wrap;
  .no-posts-found {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 64px 0;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      i {
        margin-right: 8px;
        font-size: 0.875rem;
      }
    }
  }

  .youve-reached-the-end {
    font-size: 1rem;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }

  @media (min-width: 768px) {
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 972.8px;
  }
`;

const Rooms = (props) => {
  useEffect(() => {
    props.fetchRooms();
  }, []);

  return (
    <RoomWrapper>
      <Sidebar />
      <StyledRoomContainer>
        <StyledPointer>
          <h1 className="single-room-name"># Rooms Dashboard</h1>
        </StyledPointer>
        <RoomsContainer>
          {props.rooms.length > 0 ? (
            props.rooms.map((item, index) => <Room key={index} room={item} />)
          ) : (
            <div className="no-posts-found">
              <p>
                <i className="fas fa-exclamation"></i>No Rooms found
              </p>
            </div>
          )}
        </RoomsContainer>
      </StyledRoomContainer>
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
