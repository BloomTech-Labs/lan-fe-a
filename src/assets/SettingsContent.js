import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Card, Input, Dropdown, Menu } from 'antd';
import { CloseCircleOutlined, DownOutlined } from '@ant-design/icons';
import { updateUserDisplayName, setTrackSettings } from '../store/actions';

/* eslint-disable no-undef */
const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const SettingsContent = (props) => {
  const [deactivate, setDeactivate] = useState(false);
  const history = useHistory();

  const initialSettings = {
    displayName: props.user.displayName,
    track: props.user.track,
  };
  const [settings, setSettings] = useState(initialSettings);

  const initialEditSettings = {
    displayName: false,
    track: false,
  };
  const [editSettings, setEditSettings] = useState(initialEditSettings);

  const [input, setInput] = useState('');

  useEffect(() => {
    setSettings({ ...settings, displayName: props.user.displayName });
  }, [props.user]);

  useEffect(() => {
    if (props.actKey == 'Settings') {
      setEditSettings(initialEditSettings);
      setInput('');
      setSettings(initialSettings);
    }
  }, [props.actKey]);

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

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (editSettings.displayName) {
      props.updateUserDisplayName(props.user, input);
      setSettings({ ...settings, displayName: input });
      setInput('');
      setEditSettings({ ...editSettings, displayName: false });
    } else if (editSettings.track) {
      props.setTrackSettings(props.user, settings.track);
      setEditSettings({ ...editSettings, track: false });
    }
  };

  function handleMenuClick(e) {
    setSettings({ ...settings, track: e.key });
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="WEB">WEB</Menu.Item>
      <Menu.Item key="DS">DS</Menu.Item>
      <Menu.Item key="iOS">iOS</Menu.Item>
      <Menu.Item key="UX">UX</Menu.Item>
      <Menu.Item key="AND">AND</Menu.Item>
      <Menu.Item key="None">None</Menu.Item>
    </Menu>
  );

  return (
    <Card title="Account" style={{ width: 500 }}>
      <Card
        type="inner"
        title="Display Name"
        extra={
          <Button
            type="link"
            onClick={() =>
              setEditSettings({ ...editSettings, displayName: true })
            }
          >
            Change
          </Button>
        }
      >
        {settings.displayName}
        {editSettings.displayName && (
          <form
            style={{ marginTop: '10px' }}
            autoComplete="off"
            spellCheck="false"
            onSubmit={onSubmit}
          >
            <label htmlFor="display-name">
              Set a new display name (Max 15 characters)
            </label>
            <Input
              name="display-name"
              type="text"
              placeholder="Enter new display name"
              value={input}
              style={{ marginTop: '10px' }}
              onChange={onChange}
              maxLength="15"
              required
            />
            <Button
              style={{ marginTop: '10px' }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              type="danger"
              style={{ marginLeft: '10px' }}
              onClick={() => {
                setInput('');
                setEditSettings({ ...editSettings, displayName: false });
              }}
            >
              Cancel
            </Button>
          </form>
        )}
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Lambda School Track"
        extra={
          <Button
            type="link"
            onClick={() => setEditSettings({ ...editSettings, track: true })}
          >
            Change
          </Button>
        }
      >
        {props.user.track.toUpperCase()}
        {editSettings.track && (
          <form
            style={{ marginTop: '10px' }}
            autoComplete="off"
            spellCheck="false"
            onSubmit={onSubmit}
          >
            <label htmlFor="display-name" style={{ marginRight: '10px' }}>
              Change Lambda School Track:
            </label>
            <Dropdown overlay={menu}>
              <Button>
                {settings.track} <DownOutlined />
              </Button>
            </Dropdown>
            <div>
              <Button
                style={{ marginTop: '10px' }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                type="danger"
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  setSettings(initialSettings);
                  setEditSettings({ ...editSettings, track: false });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  updateUserDisplayName,
  setTrackSettings,
})(SettingsContent);
