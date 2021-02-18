import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledRoomCard = styled.div`
    text-align: center;
    width: 40%;
    background-color: black;
    color: white;
    box-shadow: 3px 3px 5px black;
    margin: 20px;
    display: flex;
    padding: 15px;
    a {
        text-decoration: none;
        color: white;
    }
`

const room = ({ room }) => {
    return (
        <StyledRoomCard>
            <Link to={`room/${room.id}`}>
                <div>
                    <h2>{room.room_name}</h2>
                    <p>{room.description}</p> 
                </div>       
            </Link>
        </StyledRoomCard>
    )
}

export default room
