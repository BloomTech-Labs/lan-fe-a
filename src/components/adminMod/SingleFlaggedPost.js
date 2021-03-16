import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  fetchFlaggedPosts,
  archivePost,
  resolvePost,
} from '../../store/actions';
import { Link } from 'react-router-dom';
import { Button } from '../../styles/Button';

const ModStyledRoom = styled.div`
  /* width: 100%; */
  padding: 2.8%;
  background-color: #141414;
  margin: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 12px;
  i {
    margin: 0.4% 0;
    padding: 0 0.3%;
  }
  a {
    text-decoration: none;
    color: #6495ed;
    font-style: italic;
    font-weight: 500;
    font-size: 1.3rem;
    margin: 1% 0;
    transition: 0.25s;
    :hover {
      font-size: 1.4rem;
    }
  }
  h4 {
    color: white;
    font-size: 1.6rem;
    font-weight: 500;
    margin: 1% 0;
  }
  p {
    font-size: 1.1rem;
    font-weight: 500;
    color: lightgrey;
    margin: 1% 0;
  }
  .editable {
    display: flex;
    flex-direction: column;
    margin-top: 2.2%;
    margin-bottom: 2%;
  }
  .mod-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

const SingleFlaggedPost = (props) => {
  const { post } = props;

  const handleResolvePost = (id) => {
    props
      .resolvePost(id)
      .then(() => {
        props.fetchFlaggedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleArchivePost = (id) => {
    props
      .archivePost(id)
      .then(() => {
        props.fetchFlaggedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModStyledRoom>
      <div className="not-editable">
        <h4>{post.title}</h4>
        <Link to={`/post/${post.id}`}>
          <i class="far fa-clipboard"></i>Click Here To See Original Post
        </Link>
        <p>{post.description}</p>
        <div className="mod-button-wrapper">
          <Button onClick={() => handleArchivePost(post.id)}>
            Delete Post
          </Button>
          <Button onClick={() => handleResolvePost(post.id)}>
            Accept Post
          </Button>
        </div>
      </div>
    </ModStyledRoom>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchFlaggedPosts,
  archivePost,
  resolvePost,
})(SingleFlaggedPost);
