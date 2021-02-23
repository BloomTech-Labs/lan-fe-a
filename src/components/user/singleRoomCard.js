import React, { useState } from 'react'
import styled from "styled-components";
import { connect } from 'react-redux'
import { fetchRooms, updateRoom, deleteRoom } from '../../actions'

const StyledRoom = styled.div` 
  padding: 2.5%;
  background-color: #141414;
  margin: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 12px;
  h4{
    color: white;
    font-size: 1.3rem;
  }
  p{
    font-size: 1.1rem;
    font-weight: 550;
    color: lightgrey;
  }
  button {
    margin-top: 1.5%;
    margin-right: 3%;       
    padding: 8px 12px;
    background-color: #212529;
    box-shadow: 2px 2px 8px #212529;
    border: 1px solid #707B7C ;
    border-radius: 3px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.9rem;
    color: #ffffff;
    cursor: pointer;
    transition: 0.25s;
      :hover {
        opacity: 0.5;
      }
  }
`;


const SingleRoomCard = (props) => {
    const { item } = props
    const [roomValues, setRoomValues] = useState({ room_name: item.room_name, description: item.description })
    const [isEditable, setIsEditable] = useState(false)

    const editRoom = () => {
        setIsEditable(true)
    }

    const handleUpdateChange = (evt) => {
        const { name, value } = evt.target;
        setRoomValues({ ...roomValues, [name]: value })
    }

    const handleUpdateSubmit = () => {
        props.updateRoom(item.id, roomValues)
            .then(() => {
                props.fetchRooms()
            })
            .catch(err => {
                console.log(err.message)
            })
        setIsEditable(false)
    }

    const handleUpdateCancel = () => {
        setRoomValues({ room_name: item.room_name, description: item.description })
        setIsEditable(false)
    }

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
            <div className='not-editable'>
                <h4>{item.room_name}</h4>
                <p>{item.description}</p>
                <button onClick={editRoom}>Edit</button>
                <button onClick={() => handleDeleteRoom(item.id)}>Delete</button>
            </div>
            {isEditable ?
                (
                    <div className='editable'>
                        <input name='room_name' type='text' value={roomValues.room_name} onChange={handleUpdateChange} />
                        <textarea name='description' value={roomValues.description} onChange={handleUpdateChange} />
                        <button onClick={handleUpdateSubmit}>Save</button>
                        <button onClick={handleUpdateCancel}>cancel</button>
                    </div>) : null}
        </StyledRoom>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        rooms: state.rooms,
        users: state.users,
    }
}

export default connect(mapStateToProps, { updateRoom, fetchRooms, deleteRoom })(SingleRoomCard);