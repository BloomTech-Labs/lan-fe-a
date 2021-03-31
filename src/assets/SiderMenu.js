import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchRooms,
  setNewRoomModalVisibility,
  fetchPostsAndFlagsByRoom,
} from '../store/actions';
import { Menu, Button } from 'antd';
import {
  HeartOutlined,
  ShopOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';

import CreateNewRoomModal from './CreateNewRoomModal';

const SiderMenu = (props) => {
  const { url } = useRouteMatch();

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
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<ShopOutlined />} title="Rooms">
        {props.rooms.map((room) => {
          return (
            <Menu.Item key={room.id}>
              <Link
                key={room.id}
                to={`${url}/room/${room.id}`}
                onClick={() => {
                  // props.fetchPostByRoom(room.id, 1);
                  props.fetchPostsAndFlagsByRoom(room.id, 1);
                }}
              >
                {room.room_name}
              </Link>
            </Menu.Item>
          );
        })}
        <Menu.Item
          onClick={() => props.setNewRoomModalVisibility(true)}
          icon={<PlusSquareOutlined />}
        >
          Create Room
        </Menu.Item>
      </Menu.SubMenu>
      <CreateNewRoomModal />
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setNewRoomModalVisibility,
  fetchPostsAndFlagsByRoom,
})(SiderMenu);
