import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledRoomContainer = styled.div`
    padding: 5%;
    .single-room-name {
        color: white;
    }
`

const StyledPost = styled.div`
    color: white;
    border: 2px solid grey;
    padding: 7px;
    margin: 7px 0px;
    box-shadow: 5px solid black;
    .profile-img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }
    .single-post-footer {
        display: flex;
        justify-content: space-between;
    }
`

const Room = (props) => {
  return (
    <StyledRoomContainer>
      {console.log(props.rooms)}
      {props.rooms.filter(item => item.id == props.id).map(item => <h1 className="single-room-name">{item.room_name}</h1>)}
      {props.posts.map((post, index) => {
        return (
          <>
            <StyledPost className="post_card" key={index}>
              <div className="profile">
                <img className="profile-img" src={post.profile_picture} />
                <p>{post.display_name}</p>
              </div>
              <h3> {post.title} </h3>
              <p> {post.description} </p>
              <p class="single-post-footer" onClick={() => console.log(`click ${post.id}`) }><span>Likes: {post.likes}</span><span>Comments: {post.comments}</span></p>
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
