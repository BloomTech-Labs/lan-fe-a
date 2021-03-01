import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  likeComment,
  unlikeComment,
  removeCommentsByUserId,
  fetchPostCommentsByRecent
} from '../../actions';
import moment from 'moment';
import CommentContainer from './styles/commentStyle.js';

const Comment = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { comment } = props;
  useEffect(() => setLikes(props.comment.likes), [props.comment]);

  useEffect(() => {
    if (
      props.usersLikedComments.find(
        (item) => item.comment_id === props.comment.id
      )
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [props.usersLikedComments]);

  // likes comment
  const like = () => {
    setLiked(true);
    setLikes(likes + 1);
    props.likeComment(props.comment.id);
  };

  // removes like from comment
  const unlike = () => {
    setLiked(false);
    setLikes(likes - 1);
    props.unlikeComment(props.comment.id);
  };

  //removes a comment by UserId
  const removeComments = (commentId) => {
    props
      .removeCommentsByUserId(comment.id)
      .then(() => {
        props.fetchPostCommentsByRecent(comment.post_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CommentContainer>
      <img
        src={props.comment.profile_picture}
        alt="profile icon"
        onClick={() => props.history.push(`/user/${props.comment.user_id}`)}
      />
      <div className="right-section">
        <div className="user">
          <p
            className="display-name"
            onClick={() => props.history.push(`/user/${props.comment.user_id}`)}
          >
            {props.comment.display_name}
          </p>
          <p className="timestamp">
            {moment(props.comment.created_at).fromNow()}
          </p>
        </div>

        <p className="answer">{props.comment.comment}</p>

        <p className="likes">
          {liked ? (
            <i className="fas fa-thumbs-up" onClick={unlike}></i>
          ) : (
            <i className="far fa-thumbs-up" onClick={like}></i>
          )}
          {likes}
        </p>

        <button
          className="remove-comments"
          onClick={() => removeComments(props.comment.id)
          }
        >
          {console.log(props.comment.id)}
          Delete Comment
        </button>
      </div>
    </CommentContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    usersLikedComments: state.usersLikedComments,
  };
};

export default connect(mapStateToProps, { likeComment,
  unlikeComment, 
  removeCommentsByUserId, 
  fetchPostCommentsByRecent
})(
  Comment
);
