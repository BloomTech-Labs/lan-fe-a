import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUserDisplayName } from '../../store/actions';
import Header from '../common/Header';
import ProfileSettings from '../user/styles/profilesettings';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const UserSettings = (props) => {
  const [displayName, setDisplayName] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const [name, setName] = useState('');
  const [input, setInput] = useState('');

  const { push } = useHistory();

  useEffect(() => setName(props.user.displayName), [props.user]);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.updateUserDisplayName(props.user.id, input);
    setName(input);
    setInput('');
    setDisplayName(false);
  };

  // deletes user from users table
  const deleteHandler = () => {
    Axios.delete(
      `http://localhost:5000/api/user/settings/remove-user/${props.user.id}`
    )
      .then(() => {
        localStorage.removeItem('id');
        push('/');
      })
      .catch((err) => {
        console.log('Delete Error:', err);
      });
  };

  return (
    <>
      <Header history={props.history} />
      <ProfileSettings>
        <h2>Settings</h2>
        <h3>User profile</h3>
        <div className="display-name">
          <div className="settings-wrapper">
            <div className="left-section">
              <p>
                <b>Display name</b>
              </p>
              <p>{name}</p>
            </div>
            {displayName ? (
              <button onClick={() => setDisplayName(false)}>Cancel</button>
            ) : (
              <button onClick={() => setDisplayName(true)}>Update</button>
            )}
          </div>
          {displayName && (
            <form
              className="update"
              autoComplete="off"
              spellCheck="false"
              onSubmit={onSubmit}
            >
              <label htmlFor="display-name">
                Set a new display name (Max 15 characters)
              </label>
              <input
                name="display-name"
                type="text"
                placeholder="Enter a new display name"
                value={input}
                onChange={onChange}
                maxLength="15"
                required
              />
              <button type="submit">Submit</button>
            </form>
          )}

          <button
            className="track"
            onClick={() => props.history.push('/onboarding')}
          >
            <b>Update your Lambda School track</b>
            <i className="fas fa-chevron-right"></i>
          </button>

          <h4>Deactivate your account</h4>
          <button
            className="deactivate"
            onClick={() => setDeactivate(!deactivate)}
          >
            <i className="fas fa-trash-alt"></i>Deactivate your account
          </button>
          {deactivate && (
            <div className="confirm">
              <p>Are you sure you want to deactivate your account?</p>
              <button onClick={deleteHandler}>Yes</button>
              <button onClick={() => setDeactivate(false)}>No</button>
            </div>
          )}
        </div>
      </ProfileSettings>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { updateUserDisplayName })(
  UserSettings
);
