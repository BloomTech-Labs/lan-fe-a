import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { likeComment, unlikeComment } from "../../actions";
import moment from "moment";
import CommentContainer from "./styles/commentStyle.js";

const Comment = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => setLikes(props.comment.likes), [props.comment]);
  useEffect(() => {
    // Take a look at this comparison
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

  const like = () => {
    setLiked(true);
    setLikes(likes + 1);
    props.likeComment(props.comment.id);
  };

  const unlike = () => {
    setLiked(false);
    setLikes(likes - 1);
    props.unlikeComment(props.comment.id);
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
      </div>
    </CommentContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    usersLikedComments: state.usersLikedComments,
  };
};

export default connect(mapStateToProps, { likeComment, unlikeComment })(
  Comment
);
