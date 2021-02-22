import React, { useState } from 'react'

const Room = (props) => {

    const { item } = props
    console.log(item)
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
        // axios
        //   .update('', roomValues)
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err.message))
        console.log(roomValues)
    }

    const handleUpdateCancel = () => {
        setRoomValues({ room_name: '', description: '' })
        setIsEditable(false)
    }

    return (
        <div style={{ background: 'grey', margin: '1rem' }}>
            <h4>{item.room_name}</h4>
            <p>{item.description}</p>
            {/* on edit,
                          hide h4 - room_name
                          hide p - description
                      */}
            <button onClick={editRoom}>edit</button>
            <button>delete</button>
            {isEditable ?
                (
                    <form>
                        <input name='room_name' type='text' value={roomValues.room_name} onChange={handleUpdateChange} />
                        <textarea name='description' value={roomValues.description} onChange={handleUpdateChange} />
                        <button onClick={handleUpdateSubmit}>Save</button>
                        <button onClick={handleUpdateCancel}>cancel</button>
                    </form>) : null}
        </div>
    )
}

export default Room;