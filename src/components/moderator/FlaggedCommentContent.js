import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'antd';
import {
  archiveComment,
  resolveComment,
  fetchFlaggedComments,
} from '../../store/actions';

const FlaggedCommentContent = (props) => {

  const handleResolveComment = (id) => {
    props
      .resolveComment(id)
      .then(() => {
        props.fetchFlaggedComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleArchiveComment = (id) => {
    props
      .archiveComment(id)
      .then(() => {
        props.fetchFlaggedComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card style={{ marginBottom: '15px' }}>
      <h4>{props.comment.comment}</h4>
      <div>
        <Button
          type="primary"
          style={{ marginRight: '10px' }}
          onClick={() => handleResolveComment(props.comment.comment_id)}
        >
          Accept
        </Button>
        <Button
          type="danger"
          onClick={() => handleArchiveComment(props.comment.comment_id)}
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
  archiveComment,
  resolveComment,
  fetchFlaggedComments,
})(FlaggedCommentContent);
