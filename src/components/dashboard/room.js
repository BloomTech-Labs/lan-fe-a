import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import arrow from '../../img/arrow.png';
import returnpointer from '../../img/return.png';

const StyledRoomContainer = styled.div`
    width : 90%;
    padding: 2%;
    
    .single-room-name {
        color: white;
    }
`

const StyledPost = styled.div`
    color: white;
    border: 2px solid grey;
    padding: 2px;
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
const StyledPointer = styled.div`
    display: flex; 
    justify-content: space-between;
    align-item: center;
    background-color: #141414;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    .return-pointer{
      margin: 20px;
      padding: 7px;
      border: 1px solid white;
      border-radius: 15%;      
    }
    .single-room-name{
      margin-top: 1.5%;
      margin-left: 1.2%
    }
`

const Room = (props) => {
  return (
    <StyledRoomContainer>
      {console.log(props.rooms)} 
      <StyledPointer>
        {props.rooms.filter(item => item.id == props.id).map(item =>   <h1 className="single-room-name"># {item.room_name}</h1>)}
        {/* add return pointer to go back previous page */}
        <img src={returnpointer} className="return-pointer" alt="return-pointer"/>
      </StyledPointer>
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
