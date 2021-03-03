import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  likeComment,
  unlikeComment,
  removeCommentsByUserId,
  fetchPostCommentsByRecent,
  flagComment,
} from '../../store/actions';
import moment from 'moment';
import CommentContainer from './styles/commentStyle.js';

const Comment = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [editing, setEditing] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
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
  const removeComments = () => {
    props
      .removeCommentsByUserId(comment.id)
      .then(() => {
        props.fetchPostCommentsByRecent(comment.post_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFlaggingComment = () => {
    props.flagComment(props.comment.id);
    setMoreOptions(!moreOptions);
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
            <>
              <i className="blue fas fa-chevron-up" onClick={unlike}></i>
              <span className='blue'>{likes}</span>
            </>
          ) : (
            <>
              <i className="white fas fa-chevron-up" onClick={like}></i>
              <span className='white'>{likes}</span>
            </>
          )}
        </p>
        <div
          className="more-options"
          onClick={() => {
            setMoreOptions(!moreOptions);
            console.log('clicked');
          }}
        >
          <p className="fas fa-ellipsis-h"></p>
          {moreOptions && (
            <div className="commentdropdown">
              {props.comment.user_id === props.user.id ? (
                <button onClick={() => removeComments(props.comment.id)}>
                  Delete Post
                </button>
              ) : (
                ''
              )}
              {props.comment.user_id === props.user.id ? (
                <button onClick={() => setEditing(true)}>Edit</button>
              ) : (
                ''
              )}
              {props.comment.user_id !== props.user.id ? (
                <button className="flag-button" onClick={handleFlaggingComment}>
                  Flag Post
                </button>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    </CommentContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    usersLikedComments: state.usersLikedComments,
  };
};

export default connect(mapStateToProps, {
  likeComment,
  unlikeComment,
  removeCommentsByUserId,
  fetchPostCommentsByRecent,
  flagComment,
})(Comment);
