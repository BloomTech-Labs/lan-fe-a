import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchRooms,
  fetchPrivateRooms,
  setNewRoomModalVisibility,
  setReportBugModalVisibility,
  fetchPostsAndFlagsByRoom,
  fetchCurrentUsersLikedRooms,
} from '../../store/actions';
import { Menu } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  HeartOutlined,
  ShopOutlined,
  PlusSquareOutlined,
  BugOutlined,
} from '@ant-design/icons';

import CreateNewRoomModal from '../modals/CreateNewRoomModal';
import CreateNewBugModal from '../modals/CreateNewBugModal';

const SiderMenu = (props) => {
  const { url } = useRouteMatch();

  useEffect(() => {
    props.fetchPrivateRooms();
    props.fetchCurrentUsersLikedRooms(props.user.id);
  }, [props.currentUsersLikedRooms.length]);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['0']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="sub0" icon={<UserOutlined />} title="Directory">
        <Link to={`/directory`} onClick={() => {}}>
          {'Directory'}
        </Link>
      </Menu.Item>
      <Menu.SubMenu key="sub1" icon={<HeartOutlined />} title="My Rooms">
        {props.rooms.map((room, idx) => {
          if (props.currentUsersLikedRooms.includes(Number(room.id))) {
            return (
              <Menu.Item key={room.id}>
                <Link
                  key={room.id}
                  to={`/room/${room.id}`}
                  onClick={() => {
                    if (props.user.role_id < 2)
                      props.fetchPostByRoom(room.id, 1);
                    else props.fetchPostsAndFlagsByRoom(room.id, 1);
                  }}
                >
                  {room.room_name}
                </Link>
              </Menu.Item>
            );
          }
        })}
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<ShopOutlined />} title="Rooms">
        {props.rooms.map((room, idx) => {
          if (!props.currentUsersLikedRooms.includes(Number(room.id))) {
            return (
              <Menu.Item key={room.id}>
                <Link
                  key={room.id}
                  to={`/room/${room.id}`}
                  onClick={() => {
                    if (props.user.role_id < 2)
                      props.fetchPostByRoom(room.id, 1);
                    else props.fetchPostsAndFlagsByRoom(room.id, 1);
                  }}
                >
                  {room.room_name}
                </Link>
              </Menu.Item>
            );
          }
        })}
        {props.user.role_id === 3 && (
          <Menu.Item
            onClick={() => props.setNewRoomModalVisibility(true)}
            icon={<PlusSquareOutlined />}
          >
            Create Room
          </Menu.Item>
        )}
      </Menu.SubMenu>
      <Menu.SubMenu key="sub3" icon={<LockOutlined />} title="Private Rooms">
        {props.privateRooms.map((room, idx) => {
          return (
            (props.user.role_id === 3 ||
              room.users.find((el) => el.id === props.user.id)) && (
              <Menu.Item key={room.id}>
                <Link
                  key={room.id}
                  to={`/private-room/${room.id}`}
                  onClick={() => {
                    if (props.user.role_id < 2)
                      props.fetchPostByRoom(room.id, 1);
                    else props.fetchPostsAndFlagsByRoom(room.id, 1);
                  }}
                >
                  {room.room_name}
                </Link>
              </Menu.Item>
            )
          );
        })}
      </Menu.SubMenu>
      <Menu.Item
        key="sub4"
        onClick={() => props.setReportBugModalVisibility(true)}
        icon={<BugOutlined />}
      >
        Report a Bug
      </Menu.Item>
      <CreateNewRoomModal />
      <CreateNewBugModal />
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    privateRooms: state.privateRooms,
    user: state.user,
    currentUsersLikedRooms: state.currentUsersLikedRooms,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  fetchPrivateRooms,
  setNewRoomModalVisibility,
  setReportBugModalVisibility,
  fetchPostsAndFlagsByRoom,
  fetchCurrentUsersLikedRooms,
})(SiderMenu);
