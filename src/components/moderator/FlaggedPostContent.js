import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'antd';
import { fetchFlaggedPosts, archivePost, resolvePost } from '../../store/actions';

const FlaggedPostContent = (props) => {
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
    <Card style={{ marginBottom: '15px' }}>
      <h4>{props.post.title}</h4>
      <p>{props.post.description}</p>
      <div>
        <Button
          type="primary"
          style={{ marginRight: '10px' }}
          onClick={() => handleResolvePost(props.post.post_id)}
        >
          Accept
        </Button>
        <Button
          type="danger"
          onClick={() => handleArchivePost(props.post.post_id)}
        >
          Delete
        </Button>
      </div>
    </Card>
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
})(FlaggedPostContent);
