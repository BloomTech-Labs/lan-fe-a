import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  likeComment,
  unlikeComment,
  removeCommentsByUserId,
  fetchPostCommentsByRecent,
  flagComment,
} from '../../store/actions';
import { toggleDropdown } from '../../utils/toggleDropdown';
import moment from 'moment';
import CommentContainer from './styles/commentStyle.js';
import StyledModel from './styles/flagModelStyle';

const Comment = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [editing, setEditing] = useState(false);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');

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

  const onClickCommentLikesHandler = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(!liked);
      props.likeComment(props.comment.id);
    } else {
      setLikes(likes - 1);
      setLiked(!liked);
      props.unlikeComment(props.comment.id);
    }
  };

  // likes comment
  // const like = () => {
  //   setLiked(true);
  //   setLikes(likes + 1);
  //   props.likeComment(props.comment.id);
  // };

  // // removes like from comment
  // const unlike = () => {
  //   setLiked(false);
  //   setLikes(likes - 1);
  //   props.unlikeComment(props.comment.id);
  // };

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

  //flags comment
  const handleFlaggingComment = (reason) => {
    props.flagComment(props.comment.id, reason);
  };

  //opens flagging model
  const openModel = () => {
    setModelIsOpen(true);
  };

  //closes flagging model
  const closeModel = () => {
    setModelIsOpen(false);
  };

  //flags comment and closes model
  const handleFlagModel = (reason) => {
    handleFlaggingComment(reason);
    closeModel();
  };

  //Handles note input on model
  const handleNoteChange = (evt) => {
    setNote(evt.target.value);
  };

  //Sets reason for flagging
  const handleSetReason = (reason) => {
    setReason(reason);
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
              <i
                className="blue fas fa-chevron-up"
                onClick={onClickCommentLikesHandler}
              ></i>
              <span className="blue">{likes}</span>
            </>
          ) : (
            <>
              <i
                className="white fas fa-chevron-up"
                onClick={onClickCommentLikesHandler}
              ></i>
              <span className="white">{likes}</span>
            </>
          )}
        </p>
        {/* Comment dropdown menu */}
        <div className="dropdown-menu" onClick={toggleDropdown}>
          <p className="fas fa-ellipsis-h"></p>
          <div className="dropdown-content hidden">
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
              <button className="flag-button" onClick={openModel}>
                Flag Comment
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {modelIsOpen && (
        <StyledModel
          isOpen={modelIsOpen}
          onRequestClose={closeModel}
          contentLabel="Flag Comment"
          ariaHideApp={false} //Hides from screen readers. This isn't ideal, but without it, it throws an error
        >
          <div className="fpm">
            <div className="fpm-top">
              <div>
                <button onClick={closeModel}>Back</button>
              </div>
              <h1>Reason for Flagging</h1>
            </div>
            <div className="fpm-bottom">
              <div>
                <button onClick={() => handleSetReason('Spam')}>Spam</button>
              </div>
              <div>
                <button
                  onClick={() => handleSetReason('Bullying or Harrassment')}
                >
                  Bullying or Harrassment
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleSetReason('Hate Speach or Symbols')}
                >
                  Hate Speach or Symbols
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleSetReason('Nudity or Sexual Content')}
                >
                  Nudity or Sexual Content
                </button>
              </div>
              <div>
                <button onClick={() => handleSetReason('I just dislike it')}>
                  I just dislike it
                </button>
              </div>
              <div>
                <button onClick={() => handleSetReason('Other')}>Other</button>
              </div>
              <div>
                <p>Selected reason: {reason}</p>
              </div>
              <div>
                <div>
                  <form>
                    <p>Note</p>
                    <input
                      type="text"
                      name="note"
                      value={note}
                      onChange={handleNoteChange}
                    />
                  </form>
                </div>
              </div>
              <div>
                <button onClick={() => handleFlagModel(reason)}>Submit</button>
              </div>
            </div>
          </div>
        </StyledModel>
      )}
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
