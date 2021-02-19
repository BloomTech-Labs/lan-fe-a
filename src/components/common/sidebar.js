import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledSidebar = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5% 10px 5% 30px;
    height: 80vh;
    justify-content: space-around;
    a {
        color: white;
        text-decoration: none;
        font-size: 20px;
    }
    .active-sidebar-room {
        color: black;
        background-color: white;
        
    }
`

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
