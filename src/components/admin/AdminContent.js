import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  createPrivateRoom,
  addUsersPrivateRoom,
  fetchRooms,
  fetchPrivateRooms,
  fetchUsers,
  deleteRoom,
  createRoom,
} from '../../store/actions';
import SingleUserContent from './SingleUserContent';
import SingleRoomContent from '../rooms/SingleRoomContent';
import SinglePrivateRoomContent from '../rooms/SinglePrivateRoomContent';
import { Layout, Input, Button, Tabs, Modal, Select } from 'antd';

const AdminContent = (props) => {
  const { Header, Content } = Layout;

  const { TabPane } = Tabs;
  const { TextArea } = Input;
  const { Option } = Select;

  const initialRoomValue = {
    name: '',
    description: '',
  };
  const [roomValues, SetRoomValues] = useState(initialRoomValue);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPrivateModalVisible, setIsPrivateModalVisible] = useState(false);

  const [members, setMembers] = useState([]);

  const [activeTab, setActiveTab] = useState('Users');

  const showModal = () => {
    SetRoomValues(initialRoomValue);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    props
      .createRoom({
        room_name: roomValues.name,
        description: roomValues.description,
      })
      .then(() => {
        props.fetchRooms();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    SetRoomValues(initialRoomValue);
    setIsModalVisible(false);
  };

  const handleUpdateChange = (e) => {
    SetRoomValues({ ...roomValues, [e.target.name]: e.target.value });
  };

  const CreateModal = (
    <Modal
      title="Create Room"
      visible={isModalVisible}
      onOk={handleOk}
      okText="Create"
      onCancel={handleCancel}
    >
      <h4>Title</h4>
      <Input
        name="name"
        style={{ marginBottom: '15px' }}
        value={roomValues.name}
        onChange={handleUpdateChange}
      />
      <h4>Description</h4>
      <TextArea
        name="description"
        value={roomValues.description}
        onChange={handleUpdateChange}
      />
    </Modal>
  );

  const showPrivateModal = () => {
    SetRoomValues(initialRoomValue);
    setMembers([]);
    setIsPrivateModalVisible(true);
  };

  const handlePrivateOk = () => {
    props
      .createPrivateRoom(
        {
          room_name: roomValues.name,
          description: roomValues.description,
        },
        members
      )
      .then(() => {
        props.fetchPrivateRooms();
      });

    setIsPrivateModalVisible(false);
  };

  const handlePrivateCancel = () => {
    SetRoomValues(initialRoomValue);
    setMembers([]);
    setIsPrivateModalVisible(false);
  };

  const handleMembersUpdate = (membersList) => {
    setMembers(membersList);
  };

  const CreatePrivateModal = (
    <Modal
      title="Create Private Room"
      visible={isPrivateModalVisible}
      onOk={handlePrivateOk}
      okText="Create"
      onCancel={handlePrivateCancel}
    >
      <h4>Title</h4>
      <Input
        name="name"
        style={{ marginBottom: '15px' }}
        value={roomValues.name}
        onChange={handleUpdateChange}
      />
      <h4>Members</h4>
      <Select
        mode="multiple"
        value={members}
        style={{ width: '100%', marginBottom: '15px' }}
        placeholder="select a member"
        onChange={handleMembersUpdate}
        optionLabelProp="label"
      >
        {props.users.map((user) => {
          return (
            <Option key={user.id} value={user.id} label={user.display_name}>
              <div>{user.display_name}</div>
            </Option>
          );
        })}
      </Select>
      <h4>Description</h4>
      <TextArea
        name="description"
        value={roomValues.description}
        onChange={handleUpdateChange}
      />
    </Modal>
  );

  useEffect(() => {
    props.fetchUsers();
    props.fetchRooms();
    props.fetchPrivateRooms();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: '0px 0px',
          background: '#f0f2f5',
          display: 'flex',
          justifyContent: 'flex-start',
          height: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignSelf: 'flex-start',
          }}
        >
          <h2>Admin Settings</h2>
        </div>
      </Header>
      <Content>
        <Tabs onChange={(key) => setActiveTab(key)}>
          <TabPane key="Users" tab="Users">
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'flex-start',
              }}
            >
              {props.user.role_id === 3 &&
                props.users.map((item) => {
                  return (
                    <SingleUserContent
                      key={item.id}
                      user={item}
                      activeTab={activeTab}
                    />
                  );
                })}
            </div>
          </TabPane>
          <TabPane key="Rooms" tab="Rooms">
            <Button style={{ marginLeft: '20px' }} onClick={showModal}>
              Create Room
            </Button>
            {CreateModal}
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'flex-start',
                marginTop: '20px',
              }}
            >
              {props.user.role_id === 3 &&
                props.rooms.map((item) => {
                  return <SingleRoomContent key={item.id} room={item} />;
                })}
            </div>
          </TabPane>
          <TabPane key="privateRooms" tab="Private Rooms">
            <Button style={{ marginLeft: '20px' }} onClick={showPrivateModal}>
              Create Private Room
            </Button>
            {CreateModal}
            {CreatePrivateModal}
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'flex-start',
                marginTop: '20px',
              }}
            >
              {props.user.role_id === 3 &&
                props.privateRooms.map((item) => {
                  return <SinglePrivateRoomContent key={item.id} room={item} />;
                })}
            </div>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    currentPrivateRoom: state.currentPrivateRoom,
    privateRooms: state.privateRooms,
    users: state.usersAdmin,
  };
};

export default connect(mapStateToProps, {
  createPrivateRoom,
  fetchRooms,
  fetchPrivateRooms,
  addUsersPrivateRoom,
  fetchUsers,
  deleteRoom,
  createRoom,
})(AdminContent);
