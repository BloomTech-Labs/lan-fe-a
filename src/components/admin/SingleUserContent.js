import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Avatar, Card, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { updateUserRole, fetchUsers, deleteUser } from '../../store/actions';

const SingleUserContent = (props) => {
  const userRole = {
    1: 'Alumni',
    2: 'Moderator',
    3: 'Admin',
  };

  const [role, setRole] = useState(props.user.role_id);

  function handleMenuClick(e) {
    setRole(Number(e.key));
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Alumni</Menu.Item>
      <Menu.Item key="2">Moderator</Menu.Item>
      <Menu.Item key="3">Admin</Menu.Item>
    </Menu>
  );

  const handleRoleChange = () => {
    props
      .updateUserRole(props.user.id, role)
      .then(() => {
        props.fetchUsers();
      })
      .catch(() => {
        console.log('Unable to update user');
      });
  };

  const handleDeleteUser = () => {
    props
      .deleteUser(props.user.id)
      .then(() => {
        props.fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (props.activeTab !== 'Users') {
      setRole(props.user.role_id);
    }
  }, [props.activeTab]);

  return (
    <Card
      title={
        <span>
          <Avatar
            src={props.user.profile_picture}
            size={50}
            style={{ marginRight: '10px' }}
          />
          {props.user.display_name}
        </span>
      }
      bordered={false}
      style={{ width: 300, marginBottom: '20px', marginLeft: '20px' }}
      headStyle={{ backgroundColor: '#dee2e6', color: '#000' }}
    >
      <Card title="Email" type="inner">
        {props.user.email}
      </Card>
      <Card title="Role" type="inner">
        <Dropdown overlay={menu}>
          <Button style={{ width: '100%' }}>
            {userRole[role]} <DownOutlined />
          </Button>
        </Dropdown>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleRoleChange} type="primary">
          Change Role
        </Button>
        <Button onClick={handleDeleteUser} type="danger">
          Delete User
        </Button>
      </div>
    </Card>
  );
};

export default connect(null, {
  updateUserRole,
  fetchUsers,
  deleteUser,
})(SingleUserContent);
