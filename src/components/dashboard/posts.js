import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecent, fetchUsersLikedPosts } from '../../actions';
import Post from './post';
import PostsContainer from './styles/postsStyle';

const Posts = (props) => {
  useEffect(() => {
    props.fetchRecent();
    props.fetchUsersLikedPosts();
  }, []);

  return (
    <PostsContainer>
      {props.posts.length > 0 ? (
        props.posts.map((item, index) => <Post key={index} post={item} />)
      ) : (
        <div className="no-posts-found">
          <p>
            <i className="fas fa-exclamation"></i>No posts found
          </p>
        </div>
      )}
      {props.posts.length > 0 && (
        <p className="youve-reached-the-end">You've reached the end!</p>
      )}
    </PostsContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { fetchRecent, fetchUsersLikedPosts })(
  Posts
);
