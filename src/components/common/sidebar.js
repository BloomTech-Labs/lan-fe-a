import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <div>
      {props.rooms.map((room, index) => {
        return (
          <Link to={`/room/${room.id}`} key={index}>
            {room.room_name}
          </Link>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps)(Sidebar);
