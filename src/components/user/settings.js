import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUserDisplayName } from '../../actions';
import Header from '../common/header';
import Loader from '../common/loader';
import SettingsContainer from './styles/settingsStyle';

const Settings = props => {
    const [displayName, setDisplayName] = useState(false);
    const [deactivate, setDeactivate] = useState(false);
    const [name, setName] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => setName(props.user.displayName), [props.user]);

    const onChange = event => {
        setInput(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        props.updateUserDisplayName(props.user.id, input)
        setName(input);
        setInput('');
        setDisplayName(false);
    };



    return (
        <>
            <Header history={props.history} />
            {Object.keys(props.user).length > 0 ? (
                <SettingsContainer>
                    <h2>Settings</h2>
                    
                    <h3>User profile</h3>
                    <div className='display-name'>
                        <div className='left-section'>
                            <p><b>Display name</b></p>
                            <p>{name}</p>
                        </div>
                        {displayName ? <button onClick={() => setDisplayName(false)}>Cancel</button> : <button onClick={() => setDisplayName(true)}>Update</button>}
                    </div>
                    {displayName && <form className='update' autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                        <label htmlFor='display-name'>Set a new display name</label>
                        <input name='display-name' type='text' placeholder='Enter a new display name' value={input} onChange={onChange} maxLength='15' required />
                        <button type='submit'>Submit</button>
                    </form>}

                    <button className='track' onClick={() => props.history.push('/onboarding')}><b>Update your Lambda School track</b><i className='fas fa-chevron-right'></i></button>
                    
                    <h3>Deactivate your account</h3>
                    <button className='deactivate' onClick={() => setDeactivate(!deactivate)}><i className='fas fa-trash-alt'></i>Deactivate your account</button>
                    {deactivate && <div className='confirm'>
                        <p>Are you sure you want to deactivate your account?</p>
                        <button disabled>Yes</button>
                        <button onClick={() => setDeactivate(false)}>No</button>
                    </div>}
                </SettingsContainer>
            ) : (
                <Loader message={false} />
            )}
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { updateUserDisplayName })(Settings);