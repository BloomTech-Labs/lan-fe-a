import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoom, fetchRooms } from '../store/actions/index';
import { Menu, Modal, Form, Input, Button } from 'antd';
import {
  HeartOutlined,
  ShopOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';

const SiderMenu = (props) => {
  const [newRoomModalVisible, setNewRoomModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const inputHandler = (prevValues, curValues) => {
    setTitle(curValues.title);
    setDescription(curValues.description);
  };

  return (
    <Menu
      mode={localStorage.getItem('menuMode') || 'inline'}
      theme={localStorage.getItem('menuTheme') || 'light'}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.SubMenu key="sub1" icon={<HeartOutlined />} title="My Rooms">
        {/* pending implementation of associating rooms to a user */}
        <Menu.Item key="1">option1</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
        <Menu.Item key="3">option3</Menu.Item>
        <Menu.Item key="4">option4</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<ShopOutlined />} title="Rooms">
        {props.rooms.map((room, index) => {
          return (
            <Menu.Item key={index}>
              <Link key={index} to={`room/${room.id}/page/1`}>
                {room.room_name}
              </Link>
            </Menu.Item>
          );
        })}
        <Menu.Item
          onClick={() => setNewRoomModalVisible(true)}
          icon={<PlusSquareOutlined />}
        >
          Create Room
        </Menu.Item>
      </Menu.SubMenu>
      <Modal
        title="Create Room"
        centered
        visible={newRoomModalVisible}
        okButtonProps={{ htmlType: 'submit' }}
        onOk={() => {
          props
            .createRoom({ room_name: title, description: description })
            .then(() => {
              setTitle('');
              setDescription('');
              props.fetchRooms();
            })
            .catch(() => {
              console.log('failed to create room');
            });
          console.log(title, description);
          setNewRoomModalVisible(false);
        }}
        onCancel={() => setNewRoomModalVisible(false)}
      >
        <Form>
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Title required' }]}
            shouldUpdate={inputHandler}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Description required' }]}
            shouldUpdate={inputHandler}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          {/* <Form.Item>
            <Button /> 
          </Form.Item> */}
        </Form>
      </Modal>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { createRoom, fetchRooms })(SiderMenu);
