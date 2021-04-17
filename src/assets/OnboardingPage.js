import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchUser, setTrack } from '../store/actions/index';
import OnboardingContainer from './OnboardingStyles';

const Onboarding = props => {
  const { user, history, fetchUser } = props;

  const [tracks, setTracks] = useState([
    { track: 'WEB', value: false },
    { track: 'DS', value: false },
    { track: 'iOS', value: false },
    { track: 'UX', value: false },
    { track: 'AND', value: false },
    { track: 'None', value: false },
  ]);
  const [error, setError] = useState('');

  // this fires after the componenet loads
  useEffect(() => fetchUser(), []);

  useEffect(() => {
    setTracks(
      tracks.map((item) =>
        item.track === user.track
          ? { ...item, value: true }
          : { ...item, value: false }
      )
    );
  }, [user]);

  const onClick = (track) => {
    setTracks(
      tracks.map((item) =>
        item.track === track
          ? { ...item, value: true }
          : { ...item, value: false }
      )
    );
  };

  const onSubmit = () => {
    if (!tracks.find((item) => item.value === true)) {
      setError('No track chosen');
    } else {
      props
        .setTrack(tracks.find((item) => item.value === true).track, null)
        .then(() => history.push('/'))
        .catch((error) => console.log(error));
    }
  };

  return user.onboarded ? (<Redirect to="/" />) : (
    <OnboardingContainer tracks={tracks}>
      {user.displayName && (
        <h1>{user.displayName.split(' ')[0]}, what track are you in?</h1>
      )}
      <p className="instructions">
        In the future we plan to make resources relevent to your track more
        readily available. If you are not in any cohort, choose None.
      </p>
      <div className="tracks">
        <button className="track" onClick={() => onClick('WEB')}>
          Web Development
        </button>
        <button className="track" onClick={() => onClick('DS')}>
          Data Science
        </button>
        <button className="track" onClick={() => onClick('iOS')}>
          iOS
        </button>
        <button className="track" onClick={() => onClick('UX')}>
          UX Design
        </button>
        <button className="track" onClick={() => onClick('AND')}>
          Android
        </button>
        <button className="track" onClick={() => onClick('None')}>
          None
        </button>
      </div>
      <div className="continue">
        <p className="error">{error}</p>
        <button onClick={onSubmit}>
          Continue<i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </OnboardingContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUser, setTrack })(Onboarding);