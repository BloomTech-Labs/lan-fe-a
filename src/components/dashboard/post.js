import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { like, unlike } from "../../actions";
import { Link } from "react-router-dom";
import moment from "moment";
import PostContainer from "./styles/postStyle";

const Post = (props) => {
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  useEffect(() => {
    if (props.usersLikedPosts.find((item) => item.post_id === props.post.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [props.usersLikedPosts, props.posts]);

  useEffect(() => setNumberOfLikes(props.post.likes), []);

  const likeOnClick = (postID) => {
    setLiked(true);
    props.like(postID);
    setNumberOfLikes(numberOfLikes + 1);
  };

  const unlikeOnClick = (postID) => {
    setLiked(false);
    props.unlike(postID);
    setNumberOfLikes(numberOfLikes - 1);
  };

  return (
    <PostContainer post={props.post}>
      <Link to={`/post/${props.post.id}`}>
        <div className="post-card">
          <div className="left">
            <Link to={`/user/${props.post.user_id}`}>
              <img src={props.post.profile_picture} alt="profile icon" />
            </Link>
          </div>
          <div className="right">
            <div className="display-name-and-timestamp">
              <Link to={`/user/${props.post.user_id}`}>
                <p className="display-name">{props.post.display_name}</p>
              </Link>
              <p className="timestamp">
                {moment(props.post.created_at).fromNow()}
              </p>
            </div>
            {/* <div className='labels'>
							{props.post.track === 'Career Coach' && <button className='career-coach'>CAREER COACH</button>}
							{props.post.track && props.post.track !== 'Career Coach' && <button>{props.post.track.toUpperCase()}</button>}
							<button>{props.post.category.toUpperCase()}</button>
						</div> */}
            <p className="title">{props.post.title}</p>
            <p className="description">{props.post.description}</p>
            <div className="activity">
              <p>
                <Link to="/">
                  {liked ? (
                    <i
                      className="fas fa-thumbs-up"
                      onClick={() => unlikeOnClick(props.post.id)}
                    ></i>
                  ) : (
                    <i
                      className="far fa-thumbs-up"
                      onClick={() => likeOnClick(props.post.id)}
                    ></i>
                  )}
                </Link>
                {numberOfLikes}
              </p>
              <p>
                <i className="far fa-comment"></i>
                {props.post.comments}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </PostContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    usersLikedPosts: state.usersLikedPosts,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { like, unlike })(Post);
