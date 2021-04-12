import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Card } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

/* eslint-disable no-undef */
const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const SettingsContent = (props) => {
  const [deactivate, setDeactivate] = useState(false);

  const history = useHistory();

  // deletes user from users table
  const deleteHandler = () => {
    axios
      .delete(`${BACKEND_URL}/api/user/settings/remove-user/${props.user.id}`)
      .then(() => {
        localStorage.removeItem('id');
        history.push('/');
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.log('Delete Error:', err);
      });
  };

  return (
    <Card title="Account" style={{ width: 500 }}>
      <Card
        type="inner"
        title="Display Name"
        extra={<Button type="link">Change</Button>}
      >
        {props.user.display_name}
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Lambda School Track"
        extra={<Button type="link">Change</Button>}
      >
        {props.user.track.toUpperCase()}
      </Card>
      <Button
        type="primary"
        icon={<CloseCircleOutlined />}
        size="large"
        style={{ marginTop: '20px', width: '100%' }}
        onClick={() => setDeactivate(!deactivate)}
      >
        Deactivate Account
      </Button>
      {deactivate && (
        <div style={{ marginTop: '20px' }}>
          <p>Are you sure you want to deactivate your account?</p>
          <Button onClick={deleteHandler}>Yes</Button>
          <Button onClick={() => setDeactivate(false)}>No</Button>
        </div>
      )}
    </Card>
  );
};

export default SettingsContent;
