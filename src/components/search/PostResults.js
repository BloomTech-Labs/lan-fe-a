import React from 'react';

const PostResults = (props) => {
  return (
    <div>
      <h2>Posts</h2>
      {props.posts.length > 0 ? (
        props.posts.map((post) => {
          return (
            <div key={post.id}>
              <p>{post.title}</p>
              <p>{post.description}</p>
            </div>
          );
        })
      ) : (
        <p>No matching posts</p>
      )}
      
    </div>
  );
};

export default PostResults;
