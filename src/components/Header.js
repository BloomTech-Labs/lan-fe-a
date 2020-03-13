import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    .container {
        height: 72px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            cursor: pointer;
        }

        i {
            font-size: 1.25rem;
            color: white;
            cursor: pointer;
        }
    }

    .hamburger-menu {
        width: 90%;
        margin: 0 auto;
        color: white;
        display: flex;
        flex-direction: column;

        a {
            padding: 8px 0;
            border-top: 1px solid #99AAB5;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            color: white;
        }

        a:last-child {
            border-bottom: 1px solid #99AAB5;
        }
    }
`

const Header = props => {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    return (
        <HeaderContainer>
            <div className='container'>
                <h1 onClick={() => {
                    setHamburgerMenu(false);
                    props.history.push('/');
                }}>iq</h1>
                <i className="fas fa-bars" onClick={() => setHamburgerMenu(!hamburgerMenu)}></i>
            </div>
            {hamburgerMenu && <nav className='hamburger-menu'>
                <Link to='/register' onClick={() => setHamburgerMenu(false)}>Register</Link>
                <a href='#'>Log In</a>
                <Link to='/faq' onClick={() => setHamburgerMenu(false)}>FAQ</Link>
                <a href='#'>Report a Bug</a>
            </nav>}
        </HeaderContainer>
    );
};

export default Header;