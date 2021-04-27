import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchUser,
  fetchPost,
  postComment,
  fetchUsersLikedPosts,
  like,
  unlike,
  fetchUsersLikedComments,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
  deletePost,
  updatePost,
  flagPost,
} from '../../store/actions';
import { toggleDropdown } from '../../utils/toggleDropdown';
import moment from 'moment';
import Header from '../common/Header';
import Comment from './Comment';
import PostContainer from './styles/postStyle';
import StyledModel from './styles/flagModelStyle';

const Post = (props) => {
  const postID = Number(props.match.params.id);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [sortingDropdown, setSortingDropdown] = useState('Recent');
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [postInput, setPostInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    props.fetchPost(postID);
    props.fetchPostCommentsByRecent(postID);
    props.fetchUsersLikedPosts();
    props.fetchUsersLikedComments();
  }, []);

  useEffect(() => {
    setPostInput(props.currentPost.description);
  }, [props.currentPost]);

  useEffect(() => {
    if (props.usersLikedPosts.find((item) => item.post_id === postID)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [props.usersLikedPosts]);

  useEffect(() => setLikes(props.currentPost.likes), [props.currentPost]);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (input === '') {
      setError('Please enter a comment');
    } else {
      props.postComment(props.user, postID, input).then(() => {
        props.fetchPostCommentsByRecent(postID);
        setInput('');
      });
    }
  };

  // handles liking and unliking a post (makes call based on postID being passed in)
  const onClickLikesHandler = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(!liked);
      props.like(postID);
    } else {
      setLikes(likes - 1);
      setLiked(!liked);
      props.unlike(postID);
    }
  };

  // deletes post
  const deletePost = (postID) => {
    props
      .deletePost(postID)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        console.log('Could not delete post');
      });
  };

  const sortingDropdownOnChange = (event) => {
    setSortingDropdown(event.target.value);

    if (event.target.value === 'Recent') {
      props.fetchPostCommentsByRecent(postID);
    } else {
      props.fetchPostCommentsByPopular(postID);
    }
  };

  //updating a post
  const handleUpdatePost = (e) => {
    e.preventDefault();
    props.updatePost(props.user.id, postID, postInput).then(() => {
      props.fetchPost(postID);
    });
    setEditing(false);
  };

  // Flag a post
  const handleFlaggingPost = (reason) => {
    props.flagPost(postID, reason, note);
  };

  //opens flagging model
  const openModel = () => {
    setModelIsOpen(true);
  };

  //closes flagging model
  const closeModel = () => {
    setModelIsOpen(false);
  };

  //flags post and closes model
  const handleFlagModel = (reason) => {
    handleFlaggingPost(reason);
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
    <>
      <Header history={props.history} />
      {!props.individualPostIsFetching && (
        <PostContainer>
          <div className="post">
            <div className="left-section">
              {props.currentPost.profile_picture && (
                <img
                  src={props.currentPost.profile_picture}
                  alt="profile icon"
                  onClick={() =>
                    props.history.push(`/user/${props.currentPost.user_id}`)
                  }
                />
              )}
            </div>
            <div className="right-section">
              <div className="user">
                {props.currentPost.display_name && (
                  <p
                    className="display-name"
                    onClick={() =>
                      props.history.push(`/user/${props.currentPost.user_id}`)
                    }
                  >
                    {props.currentPost.display_name}
                  </p>
                )}
                {props.currentPost.created_at && (
                  <p className="timestamp">
                    {moment(props.currentPost.created_at).fromNow()}
                  </p>
                )}
              </div>
              {props.currentPost.title && (
                <p className="question">{props.currentPost.title}</p>
              )}
              <div>
                {editing && (
                  <form onSubmit={(e) => handleUpdatePost(e)}>
                    <textarea
                      className="edit-post"
                      name="post field"
                      type="text-field"
                      value={postInput}
                      onChange={(e) => setPostInput(e.target.value)}
                    />
                    <button>Update Post</button>
                  </form>
                )}
              </div>
              {props.currentPost.user_id === props.user.id ? (
                <div>
                  {editing ? (
                    <button onClick={() => setEditing(false)}>Cancel</button>
                  ) : (
                    ''
                  )}{' '}
                </div>
              ) : (
                ''
              )}
              {props.currentPost.description && (
                <p className="answer">{props.currentPost.description}</p>
              )}
              <div className="activity">
                {props.currentPost.likes !== undefined && (
                  <p>
                    {liked ? (
                      <>
                        <i
                          className="blue fas fa-chevron-up"
                          onClick={onClickLikesHandler}
                        ></i>
                        <span className="blue">{likes}</span>
                      </>
                    ) : (
                      <>
                        <i
                          className="white fas fa-chevron-up"
                          onClick={onClickLikesHandler}
                        ></i>
                        <span className="white">{likes}</span>
                      </>
                    )}
                  </p>
                )}
                <p>
                  <i className="far fa-comment"></i>
                  {props.currentPostComments.length}
                </p>
              </div>
            </div>
            {/* Post dropdown menu */}
            <div className="dropdown-menu" onClick={toggleDropdown}>
              <p className="fas fa-ellipsis-h"></p>

              <div className="dropdown-content hidden">
                {props.currentPost.user_id === props.user.id ? (
                  <Link to="/" onClick={() => deletePost(postID)}>
                    Delete Post
                  </Link>
                ) : (
                  ''
                )}
                {props.currentPost.user_id === props.user.id ? (
                  <button onClick={() => setEditing(true)}>Edit</button>
                ) : (
                  ''
                )}
                {props.currentPost.user_id !== props.user.id ? (
                  <button className="flag-button" onClick={openModel}>
                    Flag Post
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>

          <form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              type="text"
              placeholder="Add a comment..."
              value={input}
              onChange={onChange}
            />
            {error && <p className="error">{error}</p>}
            <div className="button">
              <button type="submit">Submit</button>
            </div>
          </form>

          <div className="comments">
            <div className="filter">
              <label htmlFor="sort">SORT</label>
              <select
                name="sort"
                value={sortingDropdown}
                onChange={sortingDropdownOnChange}
              >
                <option value="Recent">Recent</option>
                <option value="Popular">Popular</option>
              </select>
            </div>

            {props.individualPostCommentsAreFetching && (
              <div className="no-comments-yet">
                <p>Loading</p>
              </div>
            )}
            {!props.individualPostCommentsAreFetching &&
              props.currentPostComments.length > 0 &&
              props.currentPostComments.map((item, index) => (
                <Comment key={index} comment={item} history={props.history} />
              ))}
            {!props.individualPostCommentsAreFetching &&
              props.currentPostComments.length === 0 && (
                <div className="no-comments-yet">
                  <p>
                    <i className="fas fa-exclamation"></i>No comments yet
                  </p>
                </div>
              )}
          </div>
          {modelIsOpen && (
            <StyledModel
              isOpen={modelIsOpen}
              onRequestClose={closeModel}
              contentLabel="Flag Post"
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
                    <button onClick={() => handleSetReason('Spam')}>
                      Spam
                    </button>
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
                      onClick={() =>
                        handleSetReason('Nudity or Sexual Content')
                      }
                    >
                      Nudity or Sexual Content
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleSetReason('I just dislike it')}
                    >
                      I just dislike it
                    </button>
                  </div>
                  <div>
                    <button onClick={() => handleSetReason('Other')}>
                      Other
                    </button>
                  </div>
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
                  <p>Selected reason: {reason}</p>
                </div>
                <div>
                  <button onClick={() => handleFlagModel(reason)}>
                    Submit
                  </button>
                </div>
              </div>
            </StyledModel>
          )}
        </PostContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentPost: state.currentPost,
    currentPostComments: state.currentPostComments,
    usersLikedPosts: state.usersLikedPosts,
    individualPostIsFetching: state.individualPostIsFetching,
    individualPostCommentsAreFetching: state.individualPostCommentsAreFetching,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchPost,
  postComment,
  fetchUsersLikedPosts,
  like,
  unlike,
  fetchUsersLikedComments,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
  deletePost,
  updatePost,
  flagPost,
})(Post);
