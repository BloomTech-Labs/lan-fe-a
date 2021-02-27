import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header';
import SettingsContainer from './styles/settingsStyle';
import { fetchFlaggedPosts, fetchFlaggedComments } from '../../actions';
import SingleFlaggedPost from './singleFlaggedPost';
import SingleFlaggedComment from './singleFlaggedComment';

const StyledAdminHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  margin: 0 auto;
  border-right: 1px solid #2c2f33;
`;

const AdminSettings = (props) => {
  const [currentMod, setCurrentMod] = useState('Posts');

  useEffect(() => {
    props.fetchFlaggedPosts();
  }, []);

  const handleFetchPosts = () => {
    setCurrentMod('Posts');
    props.fetchFlaggedPosts();
  }

  const handleFetchComments = () => {
    setCurrentMod('Comments');
    props.fetchFlaggedComments();
  }

  return (
    <>
      <Header history={props.history} />
      <SettingsContainer>
        <StyledAdminHeader>
          <h2>Admin Settings</h2>
          <div className="display-name">
            <button
              className="update"
              onClick={handleFetchPosts}
            >
              Modify Posts
            </button>
            <button
              className="update"
              onClick={handleFetchComments}
            >
              Modify Comments
            </button>
          </div>
        </StyledAdminHeader>
        {props.user.role_id > 1 ? (
          currentMod == 'Posts' ? (
            <div>
              {' '}
              <h3>Posts</h3>
              <div className="users-card-wrapper">
                {props.posts.map((item) => {
                  return (
                    <SingleFlaggedPost key={item.id} post={item} />
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h3>Comments</h3>
              {props.posts.map(item => {
                return (
                  <SingleFlaggedComment key={item.id} comment={item} />
                );
              })}
            </div>
          )
        ) : (
          ''
        )}
      </SettingsContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { fetchFlaggedPosts, fetchFlaggedComments })(AdminSettings);