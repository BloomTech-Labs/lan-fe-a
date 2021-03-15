import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import { fetchFlaggedPosts, fetchFlaggedComments } from '../../store/actions';
import SingleFlaggedPost from './SingleFlaggedPost';
import SingleFlaggedComment from './SingleFlaggedComment';

import { Button } from '../../styles/Button';

const ModStyledAdminHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: whitesmoke;
  width: 99%;
  margin: 0 auto;
  padding: 2%;
  border-bottom: 2px solid #404040;
  h2 {
    font-size: 2.2rem;
  }
  /* button {
    padding: 12px 26px;
    margin-top: 16px;
    background: linear-gradient(to right, #000000, #212121);
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    transition: 0.25s;
    border: 1px solid grey;
    height: 50px;
    box-shadow: 3px 3px 6px #212121;
    :first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    } */
    :last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    /* :hover {
      opacity: 0.5;
    } */
  }
`;

const ModSettingsContainer = styled.div`
  width: 80%;
  margin: 1% auto;
  h3 {
    margin: 2%;
    color: whitesmoke;
    font-size: 2rem;
  }
`;
const AdminSettings = (props) => {
  const [currentMod, setCurrentMod] = useState('Posts');

  useEffect(() => {
    props.fetchFlaggedPosts();
  }, []);

  const handleFetchPosts = () => {
    setCurrentMod('Posts');
    props.fetchFlaggedPosts();
  };

  const handleFetchComments = () => {
    setCurrentMod('Comments');
    props.fetchFlaggedComments();
  };

  return (
    <>
      <Header history={props.history} />
      <ModSettingsContainer>
        <ModStyledAdminHeader>
          <h2>Moderator Settings</h2>
          <div className="display-name">
            <Button className="update" onClick={handleFetchPosts}>
              Modify Posts
            </Button>
            <Button className="update" onClick={handleFetchComments}>
              Modify Comments
            </Button>
          </div>
        </ModStyledAdminHeader>
        {props.user.role_id > 1 ? (
          currentMod == 'Posts' ? (
            <div>
              {' '}
              <h3>Posts</h3>
              <div className="users-card-wrapper">
                {props.posts.map((item) => {
                  return <SingleFlaggedPost key={item.id} post={item} />;
                })}
              </div>
            </div>
          ) : (
            <div>
              <h3>Comments</h3>
              {props.posts.map((item) => {
                return <SingleFlaggedComment key={item.id} comment={item} />;
              })}
            </div>
          )
        ) : (
          ''
        )}
      </ModSettingsContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, {
  fetchFlaggedPosts,
  fetchFlaggedComments,
})(AdminSettings);
