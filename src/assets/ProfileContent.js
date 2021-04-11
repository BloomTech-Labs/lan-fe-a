import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../store/actions';
import { Layout, Badge } from 'antd';

// import Feed from './Feed';

const ProfileContent = (props) => {
  const { Header, Content } = Layout;
  const userID = props.match.params.id;
  useEffect(() => {
    props.fetchUserProfile(userID);
  }, []);

  console.log(props.currentUser);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: '0px 0px',
          background: '#f0f2f5',
          display: 'flex',
          justifyContent: 'flex-start',
          height: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignSelf: 'flex-start',
          }}
        >
          <h2>My Profile</h2>
        </div>
      </Header>
      <Content>
      {Object.keys(props.currentUser).length > 0 &&
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={props.currentUser.profile_picture}
            width="100px"
            style={{ borderRadius: '50%', marginRight: '15px' }}
          />
          <Badge count={props.currentUser.track.toUpperCase()} offset={[25, -10]}>
            <h3>{props.currentUser.display_name}</h3>
          </Badge>
        </div>}
        <p>(Profile Details here, Hi!)</p>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, {
  fetchUserProfile,
})(ProfileContent);
