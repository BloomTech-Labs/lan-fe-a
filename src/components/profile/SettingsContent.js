import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Card, Input, Dropdown, Menu, Checkbox } from 'antd';
import { CloseCircleOutlined, DownOutlined } from '@ant-design/icons';
import {
  updateUserDisplayName,
  setTrackSettings,
  updateGitHubUsername,
  updateMentorToTrue,
  updateUserBio,
  updateMenteeToTrue,
} from '../../store/actions';

/* eslint-disable no-undef */
const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const SettingsContent = (props) => {
  const [deactivate, setDeactivate] = useState(false);
  const history = useHistory();

  const initialSettings = {
    displayName: props.user.displayName,
    track: props.user.track,
    githubUserName: props.user.gitHubUsername,
    userBio: props.user.userBio,
    mentorCheck: false,
    menteeCheck: false,
  };

  const [settings, setSettings] = useState(initialSettings);

  const initialEditSettings = {
    displayName: false,
    track: false,
    githubUserName: false,
    userBio: false,
  };

  const [editSettings, setEditSettings] = useState(initialEditSettings);
  const [input, setInput] = useState('');
  const [github, setGithub] = useState('');
  const [mentor, setMentor] = useState(props.user.mentor);
  const [mentee, setMentee] = useState(props.user.mentee);
  

  useEffect(() => {
    setSettings({
      ...settings,
      displayName: props.user.displayName,
      githubUserName: props.user.github_username,
    });
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

  const onChangeGitHub = (event) => {
    setGithub(event.target.value);
  };


  const onCheckMentee = () => {
    setMentee(!mentee);
    props.updateMenteeToTrue(props.user, mentee);
  };

  const onCheckMentor = () => {
    setMentor(!mentor);
    props.updateMentorToTrue(props.user, mentor);
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
    if (editSettings.githubUserName) {
      props.updateGitHubUsername(props.user, github);
      setSettings({ ...settings, gitHubUsername: github });
      setInput('');
      setEditSettings({ ...editSettings, githubUserName: false });
    } if (editSettings.userBio) {
      props.updateUserBio(props.user, input);
      setSettings({ ...settings, userBio: input });
      setInput('');
      setEditSettings({ ...editSettings, userBio: false });
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
        title="Bio"
        extra={
          <Button
            type="link"
            onClick={() =>
              setEditSettings({ ...editSettings, userBio: true })
            }
          >
            Change
          </Button>
        }
      >
        {settings.userBio}
        {editSettings.userBio && (
          <form
            style={{ marginTop: '10px' }}
            autoComplete="off"
            spellCheck="false"
            onSubmit={onSubmit}
          >
            <label htmlFor="display-name">
              Update User Bio (max 150 characters)
            </label>
            <Input
              name="user-bio"
              type="text"
              placeholder="Enter Bio Information"
              value={input}
              style={{ marginTop: '10px' }}
              onChange={onChange}
              maxLength="150"
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
                setEditSettings({ ...editSettings, userBio: false });
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
      <Card
      style={{ marginTop: 16 }}
        type="inner"
        title="GitHub Username"
        extra={
          <Button
            type="link"
            onClick={() =>
              setEditSettings({ ...editSettings, githubUserName: true })
            }
          >
            Change
          </Button>
        }
      >
        {props.user.gitHubUsername}
        {editSettings.githubUserName && (
          <form
            style={{ marginTop: '10px' }}
            autoComplete="off"
            spellCheck="false"
            onSubmit={onSubmit}
          >
            <label htmlFor="github-user-name">
              Provide your github username to display your contribution calendar
            </label>
            <Input
              name="github-user-name"
              type="text"
              placeholder="Enter GitHub username"
              value={github}
              style={{ marginTop: '10px' }}
              onChange={onChangeGitHub}
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
                setEditSettings({ ...editSettings, githubUserName: false });
              }}
            >
              Cancel
            </Button>
          </form>
        )}
      </Card>
      <Checkbox
        style={{ marginTop: '5px' }}
        checked={props.user.mentor}
        // value={mentor}
        onClick={onCheckMentor}
      >
        Check here if you are interested in becoming a mentor.
      </Checkbox>
      <br />
      <Checkbox
        style={{ marginTop: '5px' }}
        checked={props.user.mentee}
        // value={mentee}
        onClick={onCheckMentee}
      >
        Check here if you are seeking mentorship.
      </Checkbox>
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
  updateGitHubUsername,
  updateUserBio,
  updateMentorToTrue,
  updateMenteeToTrue,
})(SettingsContent);
