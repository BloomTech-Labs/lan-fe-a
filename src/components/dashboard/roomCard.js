import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledRoomCard = styled.div`
    width: 45%;
    background-color: #141414;
    color: white;
    box-shadow: 2px 2px 5px #212529;
    border-radius: 12px;
    margin: 22px 44px 22px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    a {
        text-decoration: none;
        color: white;
    }
    p {
        font-size: 1.2rem;
    }
`;

const room = ({ room }) => {
  return (
    <StyledRoomCard>
      <Link to={`room/${room.id}`}>
        <div>
          <h2># {room.room_name}</h2>
          <p>{room.description}</p> 
        </div>       
      </Link>
    </StyledRoomCard>
  );
};

export default room;
