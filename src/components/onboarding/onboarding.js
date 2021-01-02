import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, setTrack } from '../../actions';
import OnboardingContainer from './styles/onboardingStyle';

const Onboarding = props => {
    // I think efficiencies could be made with the track state
    const [tracks, setTracks] = useState([
        { track: 'WEB', value: false },
        { track: 'DS', value: false },
        { track: 'iOS', value: false },
        { track: 'UX', value: false },
        { track: 'AND', value: false },
        { track: 'None', value: false}
    ]);
    const [error, setError] = useState('');

    // The issue is whether someone signs in for the first time, is continuing an abandoned session, or is signed in on their browser and accessing a random page,
    // we need user state in the store or else functionality breaks
    useEffect(() => {
        props.fetchUser();
        console.log('PROPS IN ONBOARDING COMPONENT', props);
    }, []);

    useEffect(() => {
        setTracks(tracks.map(item => item.track === props.user.track ? { ...item, value: true } : { ...item, value: false }))
    }, [props.user]);

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
            {props.user.displayName && <h1>{props.user.displayName.split(' ')[0]}, what track are you in?</h1>}
            <p className='instructions'>The questions and replies that you post will automatically be tagged with the track you are in. If you are not in any cohort, choose None. If you are a career coach, choose I'm a career coach.</p>
            <div className='tracks'>
                <button className='track' onClick={() => onClick('WEB')}>Web Development</button>
                <button className='track' onClick={() => onClick('DS')}>Data Science</button>
                <button className='track' onClick={() => onClick('iOS')}>iOS</button>
                <button className='track' onClick={() => onClick('UX')}>UX Design</button>
                <button className='track' onClick={() => onClick('AND')}>Android</button>
                <button className='track' onClick={() => onClick('None')}>None</button>
            </div>
            <button className='career-coach' onClick={() => props.history.push('/onboarding/careercoach')}>I'm a career coach<i className='fas fa-chevron-right'></i></button>
            <div className='continue'>
                <p className='error'>{error}</p>
                <button onClick={onSubmit}>Continue<i className='fas fa-chevron-right'></i></button>
            </div>
        </OnboardingContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { fetchUser, setTrack })(Onboarding);