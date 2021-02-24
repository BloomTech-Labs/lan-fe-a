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
} from '../../actions';
import moment from 'moment';
import Header from '../common/header';
import Comment from '../post/comment';
import PostContainer from './styles/postStyle';

const Post = (props) => {
  const postID = Number(props.match.params.id);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [sortingDropdown, setSortingDropdown] = useState('Recent');
  const [moreOptions, setMoreOptions] = useState(false);

  //needed to update the post
  const [updatedPost, setUpdatedPost] = useState('');
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
      props.postComment(props.user, postID, input);
      setInput('');
    }
  };

  const like = (postID) => {
    setLiked(true);
    setLikes(likes + 1);
    props.like(postID);
  };

  const unlike = (postID) => {
    setLiked(false);
    setLikes(likes - 1);
    props.unlike(postID);
  };

  const deletePost = (postID) => {
    props.deletePost(postID);
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
    props.updatePost(postID, postInput).then(() => {
      props.fetchPost(postID);
    });
    setUpdatedPost(postInput);
    setEditing(false);
  };

  return (
    <>
      <Header history={props.history} />
      {!props.individualPostIsFetching && (
        <PostContainer>
          <div className='post'>
            <div className='left-section'>
              {props.currentPost.profile_picture && (
                <img
                  src={props.currentPost.profile_picture}
                  alt='profile icon'
                  onClick={() =>
                    props.history.push(`/user/${props.currentPost.user_id}`)
                  }
                />
              )}
            </div>
            <div className='right-section'>
              <div className='user'>
                {props.currentPost.display_name && (
                  <p
                    className='display-name'
                    onClick={() =>
                      props.history.push(`/user/${props.currentPost.user_id}`)
                    }
                  >
                    {props.currentPost.display_name}
                  </p>
                )}
                {props.currentPost.created_at && (
                  <p className='timestamp'>
                    {moment(props.currentPost.created_at).fromNow()}
                  </p>
                )}
              </div>
              <div className='labels'>
                {props.currentPost.track &&
                  props.currentPost.track === 'Career Coach' && (
                    <button className='career-coach'>CAREER COACH</button>
                  )}
                {props.currentPost.track &&
                  props.currentPost.track !== 'Career Coach' && (
                    <button>{props.currentPost.track.toUpperCase()}</button>
                  )}
                {props.currentPost.category && (
                  <button>{props.currentPost.category.toUpperCase()}</button>
                )}
              </div>
              {props.currentPost.title && (
                <p className='question'>{props.currentPost.title}</p>
              )}
              <div>
                {editing && (
                  <form onSubmit={(e) => handleUpdatePost(e)}>
                    <input
                      className='edit-post'
                      name='post field'
                      type='text'
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
                    <button onClick={() => setEditing(true)}>Edit</button>
                  )}{' '}
                </div>
              ) : (
                ''
              )}

              {props.currentPost.description && (
                <p className='answer'>{props.currentPost.description}</p>
              )}
              <div className='activity'>
                {props.currentPost.likes !== undefined && (
                  <p>
                    {liked ? (
                      <i
                        className='fas fa-thumbs-up'
                        onClick={() => unlike(postID)}
                      ></i>
                    ) : (
                      <i
                        className='far fa-thumbs-up'
                        onClick={() => like(postID)}
                      ></i>
                    )}
                    {likes}
                  </p>
                )}
                <p>
                  <i className='far fa-comment'></i>
                  {props.currentPostComments.length}
                </p>
              </div>
            </div>
            <div
              className='more-options'
              onClick={() => {
                setMoreOptions(!moreOptions);
                console.log('clicked');
              }}
            >
              <p className='fas fa-ellipsis-h'></p>
            </div>
            {moreOptions && (
              <div className='dropdown'>
                <Link to='/' onClick={() => deletePost(postID)}>
                  Delete Post
                </Link>
                {/* <Link
                  to='/'
                  onClick={() => {
                    handleUpdatePost(postID), setEditing(true);
                  }}
                >
                  Edit
                </Link> */}
              </div>
            )}
          </div>

          <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
            <label htmlFor='comment'>Comment</label>
            <textarea
              name='comment'
              type='text'
              placeholder='Add a comment...'
              value={input}
              onChange={onChange}
            />
            {error && <p className='error'>{error}</p>}
            <div className='button'>
              <button type='submit'>Submit</button>
            </div>
          </form>

          <div className='comments'>
            <div className='filter'>
              <label htmlFor='sort'>SORT</label>
              <select
                name='sort'
                value={sortingDropdown}
                onChange={sortingDropdownOnChange}
              >
                <option value='Recent'>Recent</option>
                <option value='Popular'>Popular</option>
              </select>
            </div>

            {props.individualPostCommentsAreFetching && (
              <div className='no-comments-yet'>
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
                <div className='no-comments-yet'>
                  <p>
                    <i className='fas fa-exclamation'></i>No comments yet
                  </p>
                </div>
              )}
          </div>
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
})(Post);
