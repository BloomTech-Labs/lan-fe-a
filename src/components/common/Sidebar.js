import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import StyledSidebar from './styles/sidebarStyle';

const Sidebar = (props) => {
  return (
    <StyledSidebar>
      {props.rooms.map((room, index) => {
        return (
          <NavLink
            activeClassName="active-sidebar-room"
            to={`/room/${room.id}/page/1`}
            key={index}
          >
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
