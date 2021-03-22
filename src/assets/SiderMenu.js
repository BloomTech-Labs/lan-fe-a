import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostByRoom } from '../store/actions';
import { Menu } from 'antd';
import { HeartOutlined, ShopOutlined } from '@ant-design/icons';

const SiderMenu = (props) => {
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
        {/* <Menu.Item key="1">option1</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
        <Menu.Item key="3">option3</Menu.Item>
        <Menu.Item key="4">option4</Menu.Item> */}
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<ShopOutlined />} title="Rooms">
        {props.rooms.map((room, index) => {
          return (
            <Menu.Item key={index}>
              <Link
                key={index}
                to={`/sample/${room.id}`}
                onClick={() => props.fetchPostByRoom(room.id, 1)}
              >
                {room.room_name}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu.SubMenu>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { fetchPostByRoom })(SiderMenu);
