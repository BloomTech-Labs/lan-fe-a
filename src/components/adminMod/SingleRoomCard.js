import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRooms, updateRoom, deleteRoom } from '../../store/actions';
import { Button } from '../../styles/Button';

const StyledRoom = styled.div`
  /* width: 95%; */
  padding: 2.8%;
  background-color: #141414;
  margin: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 12px;
  h3 {
    width: 100%;
    display: flex;
  }
  h4 {
    width: 98%;
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1% 0;
  }
  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: lightgrey;
  }
  .editable {
    display: flex;
    flex-direction: column;
    margin-top: 2.2%;
    margin-bottom: 2%;
  }
  .input-wrap {
    padding: 2%;
    margin: -4%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    border: none;
    /* width: 40%; */
    input {
      min-height: 44px;
      min-width: 100%;
      max-width: 100%;
    }
    textarea {
      margin-left: 2%;
      min-height: 44px;
      min-width: 100%;
      max-width: 100%;
      padding: 10px;
      background-color: #242323;
      border: 1px solid #808080;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #808080;
      /* height: 288px; */

      ::placeholder {
        color: dimgray;
      }
    }
  }
  .button-wrap {
    margin-bottom: 1%;
  }
  /* button {
    width: 15%;
    margin: 1% 0.5%;
    padding: 8px 12px;
    background: linear-gradient(to right, #141414, #212121, #282828);
    border: 1px solid #707b7c;
    border-radius: 5px;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    transition: 0.25s;
    :first-of-type {
      background-color: #f9fcff;
      background-image: linear-gradient(147deg, #f9fcff 8%, #dee4ea 74%);
      color: black;
      font-size: 1rem;
      font-weight: 700;
    }
    :hover {
      opacity: 0.5;
    }
  } */
`;

const SingleRoomCard = (props) => {
  const { item } = props;
  const [roomValues, setRoomValues] = useState({
    room_name: item.room_name,
    description: item.description,
  });
  const [isEditable, setIsEditable] = useState(false);

  const editRoom = () => {
    setIsEditable(true);
  };

  const handleUpdateChange = (evt) => {
    const { name, value } = evt.target;
    setRoomValues({ ...roomValues, [name]: value });
  };

  const handleUpdateSubmit = () => {
    props
      .updateRoom(item.id, roomValues)
      .then(() => {
        props.fetchRooms();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setIsEditable(false);
  };

  const handleUpdateCancel = () => {
    setRoomValues({ room_name: item.room_name, description: item.description });
    setIsEditable(false);
  };

  const handleDeleteRoom = (id) => {
    props
      .deleteRoom(id)
      .then(() => {
        props.fetchRooms();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledRoom>
      <div className="not-editable">
        <h4>{item.room_name}</h4>
        <p>{item.description}</p>
        <Button onClick={editRoom}>Edit</Button>
        <Button onClick={() => handleDeleteRoom(item.id)}>Delete</Button>
      </div>
      {isEditable ? (
        <div className="editable">
          <div className="button-wrap">
            <Button onClick={handleUpdateSubmit}>Save</Button>
            <Button onClick={handleUpdateCancel}>Cancel</Button>
          </div>

          <div className="input-wrap">
            <input
              name="room_name"
              type="text"
              value={roomValues.room_name}
              onChange={handleUpdateChange}
            />
            <textarea
              name="description"
              value={roomValues.description}
              onChange={handleUpdateChange}
            />
          </div>
        </div>
      ) : null}
    </StyledRoom>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    users: state.users,
  };
};

export default connect(mapStateToProps, { updateRoom, fetchRooms, deleteRoom })(
  SingleRoomCard
);
