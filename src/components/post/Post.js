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
import moment from 'moment';
import Header from '../common/Header';
import Comment from './Comment';
import PostContainer from './styles/postStyle';
import Model from 'react-modal';

const Post = (props) => {
  const postID = Number(props.match.params.id);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [sortingDropdown, setSortingDropdown] = useState('Recent');
  const [moreOptions, setMoreOptions] = useState(false);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [postInput, setPostInput] = useState('');
  const [editing, setEditing] = useState(false);

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

  // adds like to post
  const like = (postID) => {
    setLiked(true);
    setLikes(likes + 1);
    props.like(postID);
  };

  // removes like from post
  const unlike = (postID) => {
    setLiked(false);
    setLikes(likes - 1);
    props.unlike(postID);
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
  const handleFlaggingPost = () => {
    props.flagPost(postID);
  };

  //opens flagging model
  const openModel = () => {
    setModelIsOpen(true);
    setMoreOptions(false)
  };

  //closes flagging model
  const closeModel = () => {
    setModelIsOpen(false);
  };

  //flags post and closes model
  const handleFlagModel = (reason) => {
    handleFlaggingPost();
    closeModel();
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
                {console.log('post:', props.currentPost, 'user:', props.user)}
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
                          onClick={() => unlike(postID)}
                        ></i>
                        <span className="blue">{likes}</span>
                      </>
                    ) : (
                      <>
                        <i
                          className="white fas fa-chevron-up"
                          onClick={() => like(postID)}
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
            <div
              className="more-options"
              onClick={() => {
                setMoreOptions(!moreOptions);
                console.log('clicked');
              }}
            >
              <p className="fas fa-ellipsis-h"></p>
            </div>
            {moreOptions && (
              <div className="dropdown">
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
            )}
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
            <Model
              isOpen={modelIsOpen}
              onRequestClose={closeModel}
              contentLabel="Flag Post"
              ariaHideApp={false} //Hides from screen readers. This isn't ideal, but without it, it throws an error
            >
              <div>
                <div>
                  <button onClick={closeModel}>Back to Comments</button>
                </div>
                <p>Why are you Flagging this?</p>
                <div>
                  <button onClick={handleFlagModel}>Spam</button>
                </div>
                <div>
                  <button onClick={handleFlagModel}>
                    Bullying or Harrassment
                  </button>
                </div>
                <div>
                  <button onClick={handleFlagModel}>
                    Hate Speach or Symbols
                  </button>
                </div>
                <div>
                  <button onClick={handleFlagModel}>
                    Nudity or Sexual Content
                  </button>
                </div>
                <div>
                  <button onClick={handleFlagModel}>I just dislike it</button>
                </div>
              </div>
            </Model>
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
