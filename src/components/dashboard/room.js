import React from 'react';
import { connect } from 'react-redux';

const Room = (props) => {
  return (
    <div>
      {props.posts.map((post, index) => {
        return (
          <>
            <div className="post_card" key={index}>
              <div className="profile">
                <img src={post.profile_picture} />
                <p>{post.display_name}</p>
              </div>
              <h3> {post.title} </h3>
              <p> {post.description} </p>
              <p
                onClick={() => {
                  console.log(`click ${post.id}`); // need to add the liking post functionality
                }}
              >
                {' '}
                {post.likes}{' '}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps)(Room);
