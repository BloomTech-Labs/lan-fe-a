import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledRoomCard = styled.div`
    text-align: center;
    width: 40%;
    background-color: black;
    color: white;
  
`;

const StyledPost = styled.div`
  color: white;
  border: 2px solid #272626;
  border-radius: 25px;
  padding: 2%;
  margin: 2.2% 0%;
  background-color: #141414;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  justify-content: space-evenly;
  a {
    text-decoration: none;
    color: white;

    transition: all 0.2s;
      &:hover {
        color: grey;
      }
    }

  h4 {
    text-transform: capitalize;
    margin-left: 1%;
    font-size: 1.4rem;
  }
  h3 {
    margin-bottom: 0.5%;
    font-size: 1.25rem;
  }
  .profile {
    display: flex;
    align-items: center;
    margin-bottom: 1%;
    font-weight: lighter;
  }
  .profile-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .single-post-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.8%;
    align-items: center;
  }
  span {
    display: flex;
    margin-right: 2%;
  }
  p {
    justify-self: stretch;
    color: #e0dcdc;
    font-size: 1.1rem;
  }
`;

const StyledPointer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #141414;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px;
  h1 {
    font-size: 1.8rem;
  }
  .return-pointer {
    margin: 20px;
    display: flex;
    padding: 15px;
    a {
        text-decoration: none;
        color: white;
    }
  }
`;

const room = ({ room }) => {
    return (
        <StyledRoomCard>
            <Link to={`room/${room.id}`}>
                <div>
                    <h2>{room.room_name}</h2>
                    <p>{room.description}</p> 
                </div>       
            </Link>
        </StyledRoomCard>
    )
}

export default room
