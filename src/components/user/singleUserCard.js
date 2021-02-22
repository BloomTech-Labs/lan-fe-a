import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUserRole, fetchUsers } from '../../actions'
import styled from 'styled-components'

const StyledUser = styled.div`
    background-color: grey; 
    margin: 1rem;
    .update-role-status {
        color: black;
        padding-left: 7px;
    }
`

const SingleUserCard = ({user, updateUserRole, fetchUsers}) => {
    const [roleId, setRoleId] = useState(user.role_id)
    const [status, setStatus] = useState("")

    const handleSubmit = () => {
      updateUserRole(user.id, roleId)
        .then(() => {
            setStatus("User Role Updated")
            fetchUsers()
        })
        .catch(() => {
            setStatus("Unable To Update Role")
        })
    }
    return (
      <StyledUser>
        <h4>{user.display_name}</h4>
        <p>{user.email}</p>
        <select value={roleId} onChange={(e) => setRoleId(e.target.value)} name="user_role" id="user_role">
            <option value="1">Alumni</option>
            <option value="2">Moderator</option>
            <option value="3">Admin</option>
        </select>
        <button onClick={handleSubmit}>Change Role</button>
        <button>Delete</button>
        <span className="update-role-status">{status}</span>
      </StyledUser>
    )
}

export default connect(null, { updateUserRole, fetchUsers })(SingleUserCard)
