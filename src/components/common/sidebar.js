import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import arrow from '../../img/arrow.png';

const StyledSidebar = styled.div`
    display: flex;
    width : 18%;
    flex-direction: column;
    border: none;
    padding: 1.5% 10px 3% 30px;
    margin-left: 1.7%;
    margin-bottom: 3.8%;
    margin-top: 1.9%;
    height: 85vh;
    justify-content: space-around;
    background-color: #141414;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    .arrow{
      width: 32px;
      height: 5vh;
    }
    a {
        color: white;
        text-decoration: none;
        font-size: 22px;
    }
    .active-sidebar-room {
        color: white;
        background-color: #0D0D0D;
        width: 70%;
        padding: 3%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 10px;
    }


`

const Sidebar = (props) => {
  return (
    <StyledSidebar>
        {/* <img src={arrow} className="arrow" alt="arrow"/> */}
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
