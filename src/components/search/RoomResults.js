import React from 'react';

const RoomResults = (props) => {
  return (
    <div>
      <h2>Rooms</h2>
      {props.rooms.length > 0 ? (
        props.rooms.map((room) => {
          return (
            <div key={room.id}>
              <p>{room.room_name}</p>
              <p>{room.description}</p>
            </div>
          );
        })
      ) : (
        <p>No matching rooms</p>
      )}
      
    </div>
  );
};

export default RoomResults;
