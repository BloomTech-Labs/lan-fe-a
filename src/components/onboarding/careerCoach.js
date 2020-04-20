import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTrack } from '../../actions';
import CareerCoachContainer from './styles/careerCoachStyle';

const CareerCoach = props => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const onChange = event => {
        setInput(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        if (input === '') {
            setError('Please enter your viewee token');
        } else {
            props.setTrack('Career Coach', input)
                .then(response => props.history.push('/'))
                .catch(error => setError('Invalid viewee token'));
        };
    };

    return (
        <CareerCoachContainer>
            <h1>Enter your viewee token</h1>
            <p className='instructions'>As a career coach, your replies to questions will be prioritized.</p>
            <form onSubmit={onSubmit} autoComplete='off' spellCheck='false'>
                <input type='text' name='input' placeholder='Enter your viewee token' value={input} onChange={onChange} />
                <p className='error'>{error}</p>
                <div className='buttons'>
                    <button type='button' onClick={() => props.history.push('/onboarding')}><i className='fas fa-chevron-left'></i>Go back</button>
                    <button type='submit'>Continue<i className='fas fa-chevron-right'></i></button>
                </div>
            </form>
        </CareerCoachContainer>
    );
};

export default connect(null, { setTrack })(CareerCoach);