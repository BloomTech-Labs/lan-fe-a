import React, { useState } from 'react';
import Header from '../common/header';
import SettingsContainer from './styles/settingsStyle';

const Settings = props => {
    const [displayName, setDisplayName] = useState(false);
    const [deactivate, setDeactivate] = useState(false);

    return (
        <>
            <Header history={props.history} />
            <SettingsContainer>
                <h2>Settings</h2>
                
                <h3>User profile</h3>
                <div className='display-name'>
                    <div className='left-section'>
                        <p>Display name</p>
                        <p>Miguel</p>
                    </div>
                    {displayName ? <button onClick={() => setDisplayName(false)}>Cancel</button> : <button onClick={() => setDisplayName(true)}>Update</button>}
                </div>
                {displayName && <form className='update' autoComplete='off' spellCheck='false'>
                    <label htmlFor='display-name'>Set a new display name</label>
                    <input name='display-name' type='text' placeholder='Enter a new display name' />
                    <button type='submit'>Submit</button>
                </form>}

                <button className='track' onClick={() => props.history.push('/onboarding')}>Update your Lambda School track</button>
                
                <h3>Deactivate your account</h3>
                <button className='deactivate' onClick={() => setDeactivate(!deactivate)}><i className='fas fa-trash-alt'></i>Deactivate your account</button>
                {deactivate && <div className='confirm'>
                    <p>Are you sure you want to deactivate your account?</p>
                    <button disabled>Yes</button>
                    <button onClick={() => setDeactivate(false)}>No</button>
                </div>}
            </SettingsContainer>
        </>
    );
};

export default Settings;