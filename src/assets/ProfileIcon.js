import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../store/actions/index';
import { Menu, Avatar, Dropdown, Space } from 'antd';
import {
  UserOutlined,
  QuestionOutlined,
  SettingOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const ProfileIcon = (props) => {
  const [rotation, setRotation] = useState(0);
  return (
    <Dropdown
      placement="bottomCenter"
      trigger={['click']}
      onVisibleChange={() => setRotation(rotation + 180)}
      overlay={
        <Menu>
          <Menu.Item icon={<QuestionOutlined />}>
            <Link to="/faq">FAQ</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link to={`/user/${props.user.id}`}>My Profile</Link>
          </Menu.Item>
          <Menu.Item icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />}>
            <Link onClick={() => props.logOut(window.history)}>Logout</Link>
          </Menu.Item>
        </Menu>
      }
    >
      <Space size="small" style={{ height: '88%' }}>
        <Avatar src={props.user.profilePicture} size="large" />
        <p style={{ display: 'inline', color: 'white' }}>
          {props.user.displayName}
        </p>
        <DownOutlined style={{ color: 'white' }} rotate={rotation}/>
      </Space>
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { logOut })(ProfileIcon);
