import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import returnpointer from '../../img/return.png';
import likeicon from "../../img/likeicon.png";
import replyicon from "../../img/replyicon.png";
import Modal from 'react-modal';
import CreatePostContainer from '../post/styles/createPostStyle'
import { postQuestion, fetchPostByRoom } from '../../actions'

const StyledRoomContainer = styled.div`
  width : 90%;
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
  .single-room-navigation {
    display: flex;
    align-items: center;
  }
  .create-post-button {
    font-size: 16px;
    color: white;
    background-color: #0D0D0D;
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    height: 40px;
    cursor: pointer; 
  }
`;

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      backgroundColor: '#0D0D0D',
      color: 'white',
      padding: '96px 64px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
};



const Room = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [input, setInput] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState({
    checkbox: '',
    title: '',
    description: ''
  });

  const onChange = event => {
    setInput({
        ...input,
        [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (input.title === '') {
        setError({
            title: 'Please enter a title',
            description: ''
        });
    } else if (input.description === '') {
        setError({
            title: '',
            description: 'Please enter post content'
        });
    } else {
        setError({
            title: '',
            description: ''
        });
        props.postQuestion(input.title, input.description, props.id, props.history)
            .then(response => {
                setInput({
                    title: '',
                    description: ''
                })
                props.fetchPostByRoom(props.id)
                closeModal()
            })
            .catch(error => {
                console.log(error);
                setError({
                    title: '',
                    description: 'Unable to create post please try again'
                });
            });
    };
  };
  return (
    <StyledRoomContainer>
      <StyledPointer>
        {props.rooms.filter(item => item.id == props.id).map(item => <h1 className="single-room-name"># {item.room_name}</h1>)}
        {/* add return pointer to go back previous page */}
        <div className="single-room-navigation">
            <button onClick={() => openModal()} className="create-post-button">Create Post</button>
            <img src={returnpointer} className="return-pointer" alt="return-pointer"/>
        </div>
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
                  className="single-post-footer"
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='FAQ'
        style={customStyles}
        shouldCloseOnOverlayClick={false}>
        <CreatePostContainer>
            {props.rooms.filter(item => item.id == props.id).map(item => <h1 className="single-room-name"># {item.room_name}</h1>)}
            <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                {error.checkbox && <p className='error'>{error.checkbox}</p>}

                <label>Title</label>
                <input type='text' name='title' placeholder='Post Title' value={input.title} onChange={onChange} />
                {error.title && <p className='error'>{error.title}</p>}

                <label>Post Content</label>
                <textarea type='text' name='description' placeholder='Post Content' value={input.description} onChange={onChange} />
                {error.description && <p className='error'>{error.description}</p>}
                
                <div className='buttons'>
                    <button type='button' onClick={closeModal}><i className='fas fa-times'></i>Cancel</button>
                    <button type='submit'>Submit<i className='fas fa-check'></i></button>
                </div>
            </form>
        </CreatePostContainer>
      </Modal>
    </StyledRoomContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { postQuestion, fetchPostByRoom })(Room);
