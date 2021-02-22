import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import arrow from "../../img/arrow.png";
import returnpointer from "../../img/return.png";
import likeicon from "../../img/likeicon.png";
import replyicon from "../../img/replyicon.png";
const StyledRoomContainer = styled.div`
  width: 90%;
  padding: 2%;

  .single-room-name {
    color: white;
  }
`;

const StyledPost = styled.div`
  color: white;
  border: 2px solid #272626;
  border-radius: 25px;
  padding: 2%;
  margin: 2.2% 0%;
  background-color: #141414;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  justify-content: space-evenly;
  a {
    text-decoration: none;
    color: white;
    transition: all 0.2s;
    &:hover {
      color: grey;
    }
  }
  h4 {
    text-transform: capitalize;
    margin-left: 1%;
    font-size: 1.4rem;
  }
  h3 {
    margin-bottom: 0.5%;
    font-size: 1.25rem;
  }
  .profile {
    display: flex;
    align-items: center;
    margin-bottom: 1%;
    font-weight: lighter;
  }
  .profile-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .single-post-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.8%;
    align-items: center;
  }
  span {
    display: flex;
    margin-right: 2%;
  }
  p {
    justify-self: stretch;
    color: #e0dcdc;
    font-size: 1.1rem;
  }
`;
const StyledPointer = styled.div`
  display: flex;
  justify-content: space-between;
  align-item: center;
  background-color: #141414;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px;
  h1 {
    font-size: 1.8rem;
  }
  .return-pointer {
    margin: 20px;
    padding: 7px;
    border: 1px solid white;
    border-radius: 15%;
  }
  .single-room-name {
    margin-top: 1.5%;
    margin-left: 1.2%;
  }
`;

const Room = (props) => {
  return (
    <StyledRoomContainer>
      {console.log(props.rooms)}
      <StyledPointer>
        {props.rooms
          .filter((item) => item.id == props.id)
          .map((item) => (
            <h1 className="single-room-name"># {item.room_name}</h1>
          ))}
        {/* add return pointer to go back previous page */}
        <img
          src={returnpointer}
          className="return-pointer"
          alt="return-pointer"
        />
      </StyledPointer>
      {props.posts.map((post, index) => {
        return (
          <>
            <StyledPost className="post_card" key={index}>
              <Link to={`/post/${post.id}`}>
                <div className="profile">
                  <img className="profile-img" src={post.profile_picture} />
                  <h4>{post.display_name}</h4>
                </div>
                <h3> {post.title} </h3>
                <p> {post.description} </p>
                <p
                  class="single-post-footer"
                  onClick={() => console.log(`click ${post.id}`)}
                >
                  <span>
                    <img
                      className="white-like-icon"
                      src={likeicon}
                      alt="like-icon"
                    />{" "}
                    {post.likes}
                  </span>
                  <span>
                    <img
                      className="white-reply-icon"
                      src={replyicon}
                      alt="reply-icon"
                    />{" "}
                    {post.comments}
                  </span>
                </p>
              </Link>
            </StyledPost>
          </>
        );
      })}
    </StyledRoomContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps)(Room);
