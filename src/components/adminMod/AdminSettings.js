import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import SettingsContainer from '../user/styles/settingsStyle';
import {
  fetchRooms,
  fetchUsers,
  deleteRoom,
  createRoom,
} from '../../store/actions';
import SingleUserCard from './SingleUserCard';
import SingleRoomCard from './SingleRoomCard';
import { Button } from '../../styles/Button';

const StyledAdminHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: baseline;
  h2 {
    margin-right: 42%;
  }
  .admin-setting {
    display: flex;
    width: 98%;
    align-items: baseline;
  }
  .room-wrapper {
    display: flex;
    width: 98%;
    h3 {
      width: 100%;
    }
  }
`;

const StyledRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 99%;
  header {
    display: flex;
    margin: 0 auto;
    color: white;
    font-size: 1.6rem;
    font-weight: 500;
    color: #ffffff;
    border: 1px solid grey;
    border-left-style: hidden;
    border-right-style: hidden;
    border-bottom-style: hidden;
    width: 98%;
    padding: 2%;
    font-size: 1.6rem;
  }
  .create-new-room {
    form {
      border-radius: 12px;
      background-color: #141414;
      padding: 2.8%;
      margin: 2%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }
`;

const AdminSettings = (props) => {
  const [currentMod, setCurrentMod] = useState('Users');
  const [newRoom, setNewRoom] = useState({ room_name: '', description: '' });

  useEffect(() => {
    props.fetchUsers();
    props.fetchRooms();
  }, []);

  const handleRoomCreation = (e) => {
    e.preventDefault();
    props
      .createRoom(newRoom)
      .then(() => {
        setNewRoom({ room_name: '', description: '' });
        props.fetchRooms();
      })
      .catch(() => {
        console.log('failed to create room');
      });
  };

  return (
    <>
      <Header history={props.history} />
      <SettingsContainer>
        <StyledAdminHeader>
          <div className="admin-setting">
            <h2>Admin Settings</h2>
            <div className="display-name">
              <Button
                // className="update"
                onClick={() => {
                  setCurrentMod('Users');
                }}
              >
                Modify Users
              </Button>
              <Button
                // className="update"
                onClick={() => {
                  setCurrentMod('Rooms');
                }}
              >
                Modify Rooms
              </Button>
            </div>
          </div>
        </StyledAdminHeader>
        {props.user.role_id === 3 ? (
          currentMod == 'Users' ? (
            <div>
              {' '}
              <h3>Users Room</h3>
              <div className="users-card-wrapper">
                {props.users.map((item) => {
                  return <SingleUserCard key={item.id} user={item} />;
                })}
              </div>
            </div>
          ) : (
            <div>
              <StyledRoomContainer>
                <div className="room-header">
                  <header>Rooms</header>
                </div>
                <div className="create-new-room">
                  <form onSubmit={handleRoomCreation}>
                    <input
                      type="text"
                      value={newRoom.room_name}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, room_name: e.target.value })
                      }
                      id="new-room"
                      name="new-room"
                      placeholder="Room Name"
                    />
                    <input
                      type="text"
                      value={newRoom.description}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, description: e.target.value })
                      }
                      id="description"
                      name="description"
                      placeholder="Room Description"
                    />
                    <Button>Create Room</Button>
                  </form>
                </div>
                {props.rooms.map((item) => {
                  return <SingleRoomCard key={item.id} item={item} />;
                })}
              </StyledRoomContainer>
            </div>
          )
        ) : (
          ''
        )}
      </SettingsContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  fetchUsers,
  deleteRoom,
  createRoom,
})(AdminSettings);
