import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledSidebar = styled.div`
    display: flex;
    width : 20%;
    flex-direction: column;
    border: none;
    padding: 1.5% 10px 3% 20px;
    margin : 1.5% 1% 3.5% 2%;
    height: 114vh;
    justify-content: space-around;
    background-color: #141414;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    a {
        color: white;
        text-decoration: none;
        font-size: 25px;
        font-weight: 520;
    }
    .active-sidebar-room {
        color: white;
        background-color: #0D0D0D;
        width: 93%;
        padding: 3% 10px 3% 10px;
        margin: 2% 0% 2% 1%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 8px;
    }


`;

const Sidebar = (props) => {
  return (
    <StyledSidebar>
      {props.rooms.map((room, index) => {
        return (
          <NavLink activeClassName="active-sidebar-room" to={`/room/${room.id}`} key={index}>
            {room.room_name}
          </NavLink>
        );
      })}
    </StyledSidebar>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps)(Sidebar);
