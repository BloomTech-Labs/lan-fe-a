import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTrack } from '../../actions';
import OnboardingContainer from './styles/onboardingStyle';

const Onboarding = props => {
    const [tracks, setTracks] = useState([
        {
            track: 'WEB',
            value: false
        },
        {
            track: 'DS',
            value: false
        },
        {
            track: 'iOS',
            value: false
        },
        {
            track: 'UX',
            value: false
        },
        {
            track: 'AND',
            value: false
        },
        {
            track: 'None',
            value: false
        }
    ]);
    const [error, setError] = useState('');

    const onClick = track => {
        setTracks(tracks.map(item => item.track === track ? { ...item, value: true } : { ...item, value: false }));
    };

    const onSubmit = () => {
        if (!tracks.find(item => item.value === true)) {
            setError('No track chosen');
        } else {
            props.setTrack(tracks.find(item => item.value === true).track, null)
                .then(response => props.history.push('/'))
                .catch(error => console.log(error));
                // error.response.data.message
        };
    };

    return (
        <OnboardingContainer tracks={tracks}>
            <h1>{localStorage.getItem('display_name')}, what track are you in?</h1>
            <p className='instructions'>The questions and replies that you post will automatically be tagged with the track you are in. If you are not in any cohort, choose None. If you are a career coach, choose I'm a career coach.</p>
            <div className='tracks'>
                <button className='track' onClick={() => onClick('WEB')}>Web Development</button>
                <button className='track' onClick={() => onClick('DS')}>Data Science</button>
                <button className='track' onClick={() => onClick('iOS')}>iOS</button>
                <button className='track' onClick={() => onClick('UX')}>UX Design</button>
                <button className='track' onClick={() => onClick('AND')}>Android</button>
                <button className='track' onClick={() => onClick('None')}>None</button>
            </div>
            <p className='career-coach' onClick={() => props.history.push('/onboarding/careercoach')}>I'm a career coach<i className='fas fa-chevron-right'></i></p>
            <div className='continue'>
                <p className='error'>{error}</p>
                <button onClick={onSubmit}>Continue<i className='fas fa-chevron-right'></i></button>
            </div>
        </OnboardingContainer>
    );
};

export default connect(null, { setTrack })(Onboarding);