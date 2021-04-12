import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../store/actions';
import Sidebar from '../common/Sidebar';
import RoomCard from './RoomCard';
import styled from 'styled-components';

const RoomWrapper = styled.div`
  display: flex;
`;

const RoomsContainer = styled.div`
  width: 98%;
  .rooms-dashboard-wrapper {
    display: flex;
    align-items: center;
  }
  .single-room-name {
    display: flex;
    font-weight: 600;
    font-size: 2.3rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 68px;
    button {
      display: flex;
      padding: 15px;
      border: none;
      background: linear-gradient(to right, #212121, #282828, #424949);
      border: 0.2px solid #424949;
      border-radius: 50%;
      transition: 0.25s;
      :hover {
        opacity: 0.5;
      }
      .fa-search {
        display: center;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }
  }
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
`;

const StyledRoomContainer = styled.div`
  width: 90%;
  padding: 2%;
  .single-room-name {
    color: white;
  }
`;

const AllRoomsBody = (props) => {
  useEffect(() => {
    props.fetchRooms();
  }, []);

  return (
    <RoomWrapper>
      <Sidebar />
      <StyledRoomContainer>
        <RoomsContainer>
          <div className="rooms-dashboard-wrapper">
            <h1 className="single-room-name">
              Rooms Dashboard
              <button className="searcher" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </h1>
          </div>
          {props.rooms.length > 0 ? (
            props.rooms.map((item, index) => (
              <RoomCard key={index} room={item} />
            ))
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

export default connect(mapStateToProps, { fetchRooms })(AllRoomsBody);
