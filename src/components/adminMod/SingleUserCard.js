import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUserRole, fetchUsers, deleteUser } from '../../store/actions';
import styled from 'styled-components';

const StyledUser = styled.div`
  width: 45%;
  padding: 2%;
  background-color: #141414;
  margin: 2% auto;
  color: #000000;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .user-infor-wrapper {
    display: flex;
    margin: 3% auto;
  }
  .infor-card {
    display: flex;
    flex-direction: column;
    width: 55%;
    margin-left: 3%;
  }
  .user-card {
    display: flex;
    width: 95%;
    flex-direction: column;
    button {
      background: linear-gradient(to right, #141414, #212121, #282828);
      color: #ffffff;
      border: 1px solid darkgrey;
      margin: 2% 0;
      padding: 8px 12px;
      border-radius: 3px;
      font-family: 'Nunito', sans-serif;
      font-size: 0.9rem;
      cursor: pointer;
      transition: 0.25s;
      :first-of-type {
        background-color: #f9fcff;
        background-image: linear-gradient(147deg, #f9fcff 5%, #dee4ea 74%);
        color: black;
        font-weight: 700;
      }
      :last-child {
        background: linear-gradient(to right, #141414, #212121, #282828);
        font-weight: 500;
      }
      :hover {
        opacity: 0.5;
      }
    }
  }
  .drop-down {
    display: flex;
    margin: 2% 0;
    height: 35px;
    background: #212121;
    color: white;
    border-radius: 3px;
  }
  .update-role-status {
    color: black;
    padding-left: 7px;
  }

  .profile-photo {
    height: 52px;
    width: 52px;
    margin-left: 16px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.25s;
    :hover {
      opacity: 0.5;
    }
  }

  h4 {
    text-transform: capitalize;
    font-size: 1.1rem;
    font-weight: 520;
    color: #ffffff;
    margin-left: 1.5%;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
  }

  p {
    color: #ffffff;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
    font-weight: 500;
    color: lightgrey;
    margin-left: 1%;
  }
`;

const SingleUserCard = ({ user, updateUserRole, fetchUsers, deleteUser }) => {
  const [roleId, setRoleId] = useState(user.role_id);
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    updateUserRole(user.id, roleId)
      .then(() => {
        setStatus('User Role Updated');
        fetchUsers();
      })
      .catch(() => {
        setStatus('Unable To Update Role');
      });
  };

  const handleDeleteUser = () => {
    deleteUser(user.id)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledUser>
      <div className='user-card-wrapper'>
        <div className='user-infor-wrapper'>
          <img className='profile-photo' src={user.profile_picture} />
          <div className='infor-card'>
            <h4>Username - {user.display_name}</h4>
            <p>Email- {user.email}</p>
          </div>
        </div>
        <div className='user-card'>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            name='user_role'
            id='user_role'
            className='drop-down'
          >
            <option value='1'>Alumni</option>
            <option value='2'>Moderator</option>
            <option value='3'>Admin</option>
          </select>
          <button onClick={handleSubmit}>Change Role</button>
          <button onClick={handleDeleteUser}>Delete User</button>
          <span className='update-role-status'>{status}</span>
        </div>
      </div>
    </StyledUser>
  );
};

export default connect(null, { updateUserRole, fetchUsers, deleteUser })(
  SingleUserCard
);
