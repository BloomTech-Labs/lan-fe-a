import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, logOut, setSearch, fetchSearch } from '../../store/actions';
import HeaderContainer from './styles/headerStyle';
import adminLogo from '../../img/admin.png';
import AlumniLogo from'../../img/AlumniLogo.svg';
import { toggleDropdown } from '../../utils/toggleDropdown'

const Header = props => {
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
        // setHamburgerMenu(false);
        props.history.push('/');
      }}>
        <img src={AlumniLogo} alt='Lambda School logo' />
        {/* <header>Alumni Network</header> */}
      </div>
      <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
        <input type='text' placeholder='Search' value={searchInput} onChange={onChange} />
        <button type='submit'><i className='fas fa-search'></i></button>
      </form>

      <div className='dropdown-menu' onClick={toggleDropdown}>
        <img className='profile-picture' src={props.user.profilePicture} alt='profile icon'/>
        <div className='dropdown-content hidden'>
          <p onClick={() => props.history.push('/faq')}><i className='fas fa-question'></i>FAQ</p>
          <p onClick={() => props.history.push(`/user/${props.user.id}`)}><i className='fas fa-user'></i>My Profile</p>
          <p onClick={() => props.history.push('/settings')}><i className='fas fa-cog'></i>Settings</p>
          {props.user.role_id === 3 ? (
            <p onClick={() => props.history.push('/admin-settings')}><img src={adminLogo} id='admin' />Admin Settings</p>
          ) : ''}
          {props.user.role_id > 1 ? (
            <p onClick={() => props.history.push('/mod-settings')}><img src={adminLogo} id='mod' />Moderator Settings</p>
          ) : ''}
          <p onClick={() => props.logOut(props.history)}><i className='fas fa-sign-out-alt'></i>Log Out</p>
        </div>
      </div>

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
