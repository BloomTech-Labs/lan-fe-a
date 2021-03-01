import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledRoomCard = styled.div`
    width: 99%;
    background-color: #141414;
    color: white;
    border-radius: 12px;
    margin: 1.5% 15% 1.5% 25%;
    display: flex;
    flex-direction: column;
    padding: 20px;
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
      <Link to={`room/${room.id}`}>
        <div className="rooms-wrapper">
          <h2>{room.room_name}</h2>
          <p>{room.description}</p> 
        </div>       
      </Link>
    </StyledRoomCard>
  );
};

export default RoomCard;
