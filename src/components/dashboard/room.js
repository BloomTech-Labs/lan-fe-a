import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import arrow from '../../img/arrow.png';
import returnpointer from '../../img/return.png';
import Modal from 'react-modal';
import CreatePostContainer from '../post/styles/createPostStyle'
import { postQuestion, fetchPostByRoom } from '../../actions'

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
    a {
        text-decoration: none;
        color: white;
        transition: all .2s;
        &:hover {
            color: grey;
        }
    }
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
    align-items: center;
    background-color: #141414;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    .single-room-navigation {
        display: flex;
        align-items: center;
    }
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
`

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
      color: '#333',
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
                    <p>{post.display_name}</p>
                </div>
                <h3> {post.title} </h3>
                <p> {post.description} </p>
                <p class="single-post-footer" onClick={() => console.log(`click ${post.id}`) }><span>Likes: {post.likes}</span><span>Comments: {post.comments}</span></p>
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
