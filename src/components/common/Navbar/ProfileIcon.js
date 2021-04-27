import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../../store/actions/index';
import { Menu, Avatar, Dropdown, Space } from 'antd';
import {
  BugOutlined,
  UserOutlined,
  QuestionOutlined,
  SettingOutlined,
  DownOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { CheckIfModOrAdmin } from '../../../utils/CheckIfModOrAdmin';

const ProfileIcon = (props) => {
  const [rotation, setRotation] = useState(0);

  const [name, setName] = useState('');
  useEffect(() => setName(props.user.displayName), [props.user.displayName]);

  return (
    <Dropdown
      placement="bottomCenter"
      trigger={['click']}
      onVisibleChange={() => setRotation(rotation + 180)}
      overlay={
        <Menu>
          <Menu.Item icon={<UserOutlined />}>
            <Link to={`/user/${props.user.id}`}>My Profile</Link>
          </Menu.Item>
          {props.user.role_id === 3 && (
            <Menu.Item icon={<SettingOutlined />}>
              <Link to="/admin-settings">Administrator</Link>
            </Menu.Item>
          )}
          {CheckIfModOrAdmin(props.user) && (
            <Menu.Item icon={<SettingOutlined />}>
              <Link to="/mod-settings">Moderator</Link>
            </Menu.Item>
          )}
          {props.user.role_id === 3 && (
            <Menu.Item icon={<BugOutlined />}>
              <Link to="/bug-tracker">Bug Tracker</Link>
            </Menu.Item>
          )}
          <Menu.Item icon={<QuestionOutlined />}>
            <Link to={`/faq`}>FAQ</Link>
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />}>
            <Link to="/welcome" onClick={() => props.logOut(window.history)}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      }
    >
      <Space size="small" style={{ height: '88%' }}>
        <Avatar src={props.user.profilePicture} size="large" />
        <p style={{ display: 'inline' }}>{name}</p>
        <DownOutlined rotate={rotation} />
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
