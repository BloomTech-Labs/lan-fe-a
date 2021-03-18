import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledRoomCard = styled.div`
  width: 100%;
  background-color: #141414;
  color: white;
  border-radius: 12px;
  margin: 1.5% 0% 1.5% 0%;
  display: flex;
  flex-direction: column;
  padding: 2%;
  transition: 0.25s;
  :hover {
    opacity: 0.5;
  }
  a {
    text-decoration: none;
    color: white;
  }
  p {
    font-size: 1.2rem;
  }
`;

const RoomCard = ({ room }) => {
  return (
    <StyledRoomCard>
      <Link to={`room/${room.id}/page/1`}>
        <div className="rooms-wrapper">
          <h2>{room.room_name}</h2>
          <p>{room.description}</p>
        </div>
      </Link>
    </StyledRoomCard>
  );
};

export default RoomCard;
