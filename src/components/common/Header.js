import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, logOut, setSearch, fetchSearch } from '../../store/actions';
import HeaderContainer from './styles/headerStyle';
import adminLogo from '../../img/admin.png';
import AlumniLogo from'../../img/AlumniLogo.svg';
import burgerMenu from '../../img/burgerMenu.svg';

const Header = props => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [viewModeDropdown, setViewModeDropdown] = useState(false)
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

  // Checks for click on window and sets dropdowns to false if the click is not on either one of the dropdowns
  window.addEventListener('click', e => {
    if (!e.srcElement.alt) {
      setViewModeDropdown(false);
      setProfileDropdown(false);
    }
  });

  const DropdrownHandler = e => {
    if (e.target.id === 'viewModeDropdown') {
      setViewModeDropdown(!viewModeDropdown);
       if (profileDropdown) 
         setProfileDropdown(false);  
    } else if (e.target.id === 'profileDropdown') {
      setProfileDropdown(!profileDropdown);
       if (viewModeDropdown) 
         setViewModeDropdown(false);  
    }
  }
  
  return (
    <HeaderContainer>
      <div className='logo' onClick={() => {
        setProfileDropdown(false);
        props.history.push('/');
      }}>
        <img src={AlumniLogo} alt='Lambda School logo' />
        {/* <header>Alumni Network</header> */}
      </div>
      <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
        <input type='text' placeholder='Search' value={searchInput} onChange={onChange} />
        <button type='submit'><i className='fas fa-search'></i></button>
      </form>

      <img src={burgerMenu} alt='dropdown menu' width="20px" id='viewModeDropdown' onClick={DropdrownHandler}/>
      
      <img className='profile-picture' src={props.user.profilePicture} alt='profile icon' id='profileDropdown' onClick={DropdrownHandler}/>

      {profileDropdown && <div className='dropdown'>
        <p onClick={() => props.history.push('/faq')}><i className='fas fa-question'></i>FAQ</p>
        <p onClick={() => props.history.push(`/user/${props.user.id}`)}><i className='fas fa-user'></i>My Profile</p>
        <p onClick={() => props.history.push('/settings')}><i className='fas fa-cog'></i>Settings</p>
        <p onClick={() => props.logOut(props.history)}><i className='fas fa-sign-out-alt'></i>Log Out</p>
      </div>}

      {viewModeDropdown && <div className='dropdown'>
        {props.user.role_id === 3 ? (
          <p onClick={() => props.history.push('/admin-settings')}><img src={adminLogo} id='admin' />Admin Settings</p>
        ) : ''}
        {props.user.role_id > 1 ? (
          <p onClick={() => props.history.push('/mod-settings')}><img src={adminLogo} id='mod' />Moderator Settings</p>
        ) : ''}
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
