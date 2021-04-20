import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchUsers,
  deleteRoom,
  createRoom,
} from '../store/actions';
import SingleUserContent from './SingleUserContent';
import SingleRoomContent from './SingleRoomContent';
import { Layout, Input, Button, Tabs, Modal } from 'antd';

const AdminContent = (props) => {
  const { Header, Content } = Layout;

  const { TabPane } = Tabs;

  const { TextArea } = Input;

  const initialRoomValue = {
    name: '',
    description: '',
  };

  const [roomValues, SetRoomValues] = useState(initialRoomValue);

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  useEffect(() => {
    props.fetchUsers();
    props.fetchRooms();
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
        </Tabs>
      </Content>
    </Layout>
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
})(AdminContent);
