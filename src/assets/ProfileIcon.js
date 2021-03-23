import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Avatar, Dropdown, Space } from 'antd';
import {
  UserOutlined,
  QuestionOutlined,
  SettingOutlined,
  DownOutlined
} from '@ant-design/icons';

const ProfileIcon = (props) => {
  return (
    <Dropdown
      placement="bottomRight"
      arrow
      trigger={['click']}
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
        </Menu>
      }
    >
      <Space size='small'>
        <Avatar src={props.user.profilePicture} size="large" />
        <p style={{ display: 'inline', color: 'white' }}>
          {props.user.displayName}
        </p>
        <DownOutlined style={{color: 'white'}}/>
      </Space>
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfileIcon);
