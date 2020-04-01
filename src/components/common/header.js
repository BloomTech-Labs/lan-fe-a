import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser, logOut } from '../../actions';
import HeaderContainer from './styles/headerStyle';
import viewee from '../../img/viewee.png';

const Header = props => {
    const [input, setInput] =  useState('');
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    useEffect(() => props.setUser(), []);

    const onChange = event => {
        setInput(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
    };

    return (
        <HeaderContainer>
            <div className='logo' onClick={() => {
                setHamburgerMenu(false);
                props.history.push('/');
            }}>
                <img src={viewee} alt='viewee logo' />
                <h1>viewee</h1>
            </div>

            <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                <input type='text' placeholder='Search for a question' value={input} onChange={onChange} />
                <button type='submit'><i className='fas fa-search'></i></button>
            </form>
            
            <img className='profile-picture' src={props.user.profilePicture} alt='profile picture' onClick={() => setHamburgerMenu(!hamburgerMenu)} />

            {hamburgerMenu && <div className='dropdown'>
                <a href='https://github.com/viewee/frontend/issues' target='_blank' rel='noreferrer noopener'><p><i className='fas fa-bug'></i>Report a Bug</p></a>
                <p onClick={() => props.logOut(props.history)}><i className='fas fa-sign-out-alt'></i>Log Out</p>
            </div>}
        </HeaderContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { setUser, logOut })(Header);