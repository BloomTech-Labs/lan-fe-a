import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header';
import SettingsContainer from './styles/settingsStyle';
import { fetchRooms, fetchUsers } from '../../actions'

const BACKEND_URL = process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const AdminSettings = (props) => {
  const [currentMod, setCurrentMod] = useState("Users")

  useEffect(() => {
    props.fetchUsers()
    props.fetchRooms()
  }, [])

  const createRoom = (e) => {
      e.preventDefault()
  }
  return (
    <>
      <Header history={props.history}/>
      <SettingsContainer>
        <h2>Admin Settings</h2>
        <div className='display-name'>
          <button className='update' onClick={() => {
            setCurrentMod('Users');
          }}>
            Modify Users
          </button>
          <button className='update' onClick={() => {
            setCurrentMod('Rooms');
          }}>
            Modify Rooms
          </button>
        </div>
        {props.user.role_id === 3 ?
          currentMod == 'Users' ? (
              <div>
                  <h3>Users</h3>
                  {props.users.map(item => {
                    return (
                        <div key={item.id} style={{background: 'grey', margin: '1rem'}}>
                        <h4>{item.display_name}</h4>
                        <p>{item.email}</p>
                        <button>Change Role</button>
                        <button>Delete</button>
                        </div>
                    )
                    })}
              </div>
          ) : (
            <div>
              <h3>Rooms</h3>
              <div className="create-new-room">
                <form onSubmit={createRoom}>
                  <input type="text" id="new-room" name="new-room" placeholder="Room Name" />
                  <button>Create Room</button>
                </form>
              </div>
              {props.rooms.map(item => {
              return (
                <div key={item.id} style={{background: 'grey', margin: '1rem'}}>
                  <h4>{item.room_name}</h4>
                  <p>{item.description}</p>
                  <button>View Posts</button>
                  <button>Delete</button>
                </div>
              )
            })}
            </div>
            )
        : ''}
      </SettingsContainer>
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    users: state.users
  }
}

export default connect(mapStateToProps, { fetchRooms, fetchUsers })(AdminSettings);