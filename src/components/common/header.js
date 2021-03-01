import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, logOut, setSearch, fetchSearch } from '../../actions';
import HeaderContainer from './styles/headerStyle';
import whitelambda from '../../img/whitelambda.png';
import adminLogo from '../../img/admin.png';

const Header = props => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    if (Object.keys(props.user).length === 0) {
      props.fetchUser();
    };
  }, []);

  const onChange = event => {
    setSearchInput(event.target.value);
    props.setSearch(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setSearchInput('');
    props.history.push('/full-search');
  };

  return (
    <HeaderContainer>
      <div className='logo' onClick={() => {
        setHamburgerMenu(false);
        props.history.push('/');
      }}>
        <img src={whitelambda} alt='Lambda School logo' />
        {/* <header>Alumni Network</header> */}
      </div>

      <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
        <input type='text' placeholder='Search for a question' value={searchInput} onChange={onChange} />
        <button type='submit'><i className='fas fa-search'></i></button>
      </form>

      <img className='profile-picture' src={props.user.profilePicture} alt='profile icon' onClick={() => setHamburgerMenu(!hamburgerMenu)} />

      {hamburgerMenu && <div className='dropdown'>
        <p onClick={() => props.history.push('/faq')}><i className='fas fa-question'></i>FAQ</p>
        <a href='https://github.com/viewee/frontend/issues' target='_blank' rel='noreferrer noopener'><p><i className='fas fa-bug'></i>Report a Bug</p></a>
        <p onClick={() => props.history.push(`/user/${props.user.id}`)}><i className='fas fa-user'></i>My Profile</p>
        <p onClick={() => props.history.push('/settings')}><i className='fas fa-cog'></i>Settings</p>
        {props.user.role_id === 3 ? (
          <p onClick={() => props.history.push('/admin-settings')}><img src={adminLogo} id='admin' />Admin Settings</p>
        ) : ''}
        {props.user.role_id > 1 ? (
          <p onClick={() => props.history.push('/mod-settings')}><img src={adminLogo} id='mod' />Moderator Settings</p>
        ) : ''}
        <p onClick={() => props.logOut(props.history)}><i className='fas fa-sign-out-alt'></i>Log Out</p>
      </div>}
    </HeaderContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    search: state.search
  };
};

export default connect(mapStateToProps, { fetchUser, logOut, setSearch, fetchSearch })(Header);