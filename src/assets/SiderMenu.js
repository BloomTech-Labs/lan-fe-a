import React,{useEffect} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchRooms,
  setNewRoomModalVisibility,
  fetchPostsAndFlagsByRoom,
  fetchCurrentUsersLikedRooms
} from '../store/actions';
import { Menu } from 'antd';
import {
  HeartOutlined,
  ShopOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';

import CreateNewRoomModal from './CreateNewRoomModal';

const SiderMenu = (props) => {
  const { url } = useRouteMatch();

  useEffect(()=>{
   props.fetchCurrentUsersLikedRooms(props.user.id)
  },[])

  return (
    <Menu
      mode={localStorage.getItem('menuMode') || 'inline'}
      theme={localStorage.getItem('menuTheme') || 'light'}
      defaultSelectedKeys={['0']}
      defaultOpenKeys={['sub2']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.SubMenu key="sub1" icon={<HeartOutlined />} title="My Rooms">
      {props.rooms.map((room, idx) => {
        if (props.currentUsersLikedRooms.includes(Number(room.id))){
          return (
            <Menu.Item key={idx}>
              <Link
                key={room.id}
                to={`/room/${room.id}`}
                onClick={() => {
                  if (props.user.role_id < 2) props.fetchPostByRoom(room.id, 1);
                  else props.fetchPostsAndFlagsByRoom(room.id, 1);
                }}
              >
                {room.room_name}
              </Link>
            </Menu.Item>
          )}
        })}
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<ShopOutlined />} title="Rooms">
        
        {props.rooms.map((room, idx) => {
          if (!props.currentUsersLikedRooms.includes(Number(room.id))){
          return (
            <Menu.Item key={idx}>
              <Link
                key={room.id}
                to={`/room/${room.id}`}
                onClick={() => {
                  if (props.user.role_id < 2) props.fetchPostByRoom(room.id, 1);
                  else props.fetchPostsAndFlagsByRoom(room.id, 1);
                }}
              >
                {room.room_name}
              </Link>
            </Menu.Item>
          )}
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
    user: state.user,
    currentUsersLikedRooms: state.currentUsersLikedRooms
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setNewRoomModalVisibility,
  fetchPostsAndFlagsByRoom,
  fetchCurrentUsersLikedRooms
})(SiderMenu);
