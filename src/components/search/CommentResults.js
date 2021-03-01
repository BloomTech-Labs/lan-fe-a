import React from 'react';

const CommentResults = (props) => {
  return (
    <div>
      <h2>Comments</h2>
      {props.comments.length > 0 ? (
        props.comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.comment}</p>
            </div>
          );
        })
      ) : (
        <p>No matching comments</p>
      )}
      
    </div>
  );
};

export default CommentResults;
