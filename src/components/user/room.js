import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { connect } from 'react-redux'
import { fetchRooms, updateRoom } from '../../actions'

const Room = (props) => {
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

    const handleUpdateSubmit = (evt) => {
        evt.preventDefault()
        props.updateRoom(item.id, roomValues).then(fetchRooms)
        setIsEditable(false)
    }

    const handleUpdateCancel = () => {
        setRoomValues({ room_name: item.room_name, description: item.description })
        setIsEditable(false)
    }

    useEffect(() => {
        console.log('rooms updated')
    }, [])

    return (
        <div style={{ background: 'grey', margin: '1rem' }}>
            <div className='not-editable'>
                <h4>{item.room_name}</h4>
                <p>{item.description}</p>
                <button onClick={editRoom}>edit</button>
                <button>delete</button>
            </div>
            {isEditable ?
                (
                    <div className='editable'>
                        <input name='room_name' type='text' value={roomValues.room_name} onChange={handleUpdateChange} />
                        <textarea name='description' value={roomValues.description} onChange={handleUpdateChange} />
                        <button onClick={handleUpdateSubmit}>Save</button>
                        <button onClick={handleUpdateCancel}>cancel</button>
                    </div>) : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        rooms: state.rooms,
        users: state.users,
    }
}

export default connect(mapStateToProps, { updateRoom })(Room);
