import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import HeaderContainer from './styles/headerStyle';

const Header = props => {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    return (
        <HeaderContainer>
            <div className='container'>
                <h1 onClick={() => {
                    setHamburgerMenu(false);
                    props.history.push('/');
                }}>viewee</h1>
                <i className="fas fa-bars" onClick={() => setHamburgerMenu(!hamburgerMenu)}></i>
            </div>
            {hamburgerMenu && <nav className='hamburger-menu'>
                <Link to='/register' onClick={() => setHamburgerMenu(false)}>Register</Link>
                <Link to='/login' onClick={() => setHamburgerMenu(false)}>Log In</Link>
                <Link to='/faq' onClick={() => setHamburgerMenu(false)}>FAQ</Link>
                <a href='https://github.com/iqapp/frontend/issues' onClick={() => setHamburgerMenu(false)} target='_blank' rel='noopener noreferrer'>Report a Bug</a>
            </nav>}
        </HeaderContainer>
    );
};

export default Header;