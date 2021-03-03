import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import returnpointer from '../../img/return.png';
import likeicon from '../../img/likeicon.png';
import replyicon from '../../img/replyicon.png';
import Modal from 'react-modal';
import CreatePostContainer from './styles/createPostStyle';
import { like, unlike, postQuestion, fetchPostByRoom, fetchPostByRoomByPopular, fetchUsersLikedPosts } from '../../store/actions';

const StyledRoomContainer = styled.div`
  width : 90%;
  padding: 2%;
  .single-room-name {
    color: white;
  }
  .pagination {
      text-align: center;
    a {
      color: white;
      text-decoration: none;
      cursor: pointer;
      margin: auto 3%;
      transition: all .2s;
      padding: 7px;
      &:hover {
          color: grey;
      }
    }
    .active-page {
      color: grey;
      border: 1px solid white;
      border-radius: 50%;
    }
  }
`;

const StyledPost = styled.div`
  color: white;
  border: 2px solid #272626;
  border-radius: 15px;
  padding: 2%;
  margin: 2.2% 0%;
  background-color: #141414;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  justify-content: space-evenly;
  transition: 0.2s;
  :hover{
      opacity: 0.5;
    }
  a {
    text-decoration: none;
    color: white;
    transition: all 0.2s;
    }

  h4 {
    text-transform: capitalize;
    margin-left: 1%;
    font-size: 1.5rem;
    font-weight: 540;
  }
  h3 {
    margin-bottom: 0.5%;
    font-size: 1.25rem;
    font-weight: 550;
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
    color: #D8D8D8;
    font-size: 1.1rem;
    font-weight: lighter;
    transition: 0.25s;
  }
  .fa-thumbs-up {
      cursor: pointer;
  }
  .fas {
      color: #0099ff;
  }
`;

const StyledPointer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #141414;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  border-radius: 10px;
  h1 {
    font-size: 1.8rem;
  }
  .filters {
    font-size: 16px;
    color: white;
    background-color: #0D0D0D;
    border: 1px solid white;
    border-radius: 5px;
    height: 40px;
    padding-top: 10px;
    padding-right: 5px;
    label {
      padding-right: 5px;
    }
    select {
      font-size: 16px;
      color: white;
      background-color: #0D0D0D;
      border: 1px solid white;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .return-pointer {
    margin: 20px;
    padding: 7px;
    border: 2px solid grey ;
    border-radius: 50%;
    transition: 0.25s;
    :hover{
      opacity: 0.5;
    }
  }
  .single-room-name {
    /* margin-top: 1.5%; */
    margin-left: 1.2%;
    font-weight: 500;
  }
  .single-room-navigation {
    display: flex;
    align-items: center;
  }
  .create-post-button {
    width: max-content;
    justify-self: center;
    font-size: 18px;
    color: white;
    border: none;
    background-color: #4571C9;
    padding: 15px;
    border-radius: 10px;
    height: 50px;
    cursor: pointer; 
    transition: 0.25s;
    :hover{
      opacity: 0.5;
    }
    /* font-weight: 600; */
    /* border: 1px solid white; */
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

const RoomBody = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    let length = 10;
    if (length > props.totalPages) length = props.totalPages;
    let start = props.page - Math.floor(length / 2);
    start = Math.max(start, 1);
    start = Math.min(start, 1 + props.totalPages - length);
    const newBlock = Array.from({length: length}, (el, i) => <Link key={`page-${i + 1}`} className={`pag-link${i + 1 == props.page ? ' active-page' : ''}`} to={`/room/${props.id}/page/${start + i}`}>{start + i}</Link>);
    setBlocks(newBlock);
  }, [props.page, props.totalPages]);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  

  const handleSortChange = (e) => {
    props.setSortValue(e.target.value);
    if (e.target.value === 'Recent') {
      props.fetchPostByRoom(props.id, props.page);
    } else if (e.target.value === 'Popular') {
      props.fetchPostByRoomByPopular(props.id, props.page);
    } else {
      props.setSortValue('Recent');
    }
  };
  
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // adds like to post
  const handleLike = (postID) => {
    props.like(postID)
      .then(() => {
        props.fetchUsersLikedPosts();
        if (props.sortValue == 'Recent') {
          props.fetchPostByRoom(props.id, props.page);
        } else {
          props.fetchPostByRoomByPopular(props.id, props.page);
        }
      });
  };
    
  // removes like from post
  const handleUnlike = (postID) => {
    props.unlike(postID)
      .then(() => {
        props.fetchUsersLikedPosts();
        if (props.sortValue == 'Recent') {
          props.fetchPostByRoom(props.id, props.page);
        } else {
          props.fetchPostByRoomByPopular(props.id, props.page);
        }
      });
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
        .then(() => {
          setInput({
            title: '',
            description: ''
          });
          if (props.sortValue == 'Recent') {
            props.fetchPostByRoom(props.id, props.page);
          } else {
            props.fetchPostByRoomByPopular(props.id, props.page);
          }
          closeModal();
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
        {props.rooms.filter(item => item.id == props.id).map(item => <h1 key={item.id} className="single-room-name">{item.room_name}</h1>)}
        {/* add return pointer to go back previous page */}
        <div className="single-room-navigation">
          <div className='filters'>
            <label htmlFor='sort'>SORT</label>
            <select name='sort' value={props.sortValue} onChange={(e) => handleSortChange(e)}>
              <option value='Recent'>Recent</option>
              <option value='Popular'>Popular</option>
            </select>
          </div>
          <button onClick={() => openModal()} className="create-post-button">Create Post</button>
          <img src={returnpointer} className="return-pointer" alt="return-pointer"/>
        </div>
      </StyledPointer>
      {props.posts.map((post, index) => {
        return (
          <div key={`post-id-${post.id}`}>
            <StyledPost className="post_card" key={index}>
              <Link to={`/post/${post.id}`}>
                <div className="profile">
                  <img className="profile-img" src={post.profile_picture} />
                  <h4>{post.display_name}</h4>
                </div>
                <h3> {post.title} </h3>
                <p> {post.description} </p>
              </Link>
              <p
                className="single-post-footer"
              >
                <span>
                  {props.usersLikedPosts.find((item) => item.post_id === post.id) ? (
                    <i
                      className="fas fa-thumbs-up"
                      onClick={() => handleUnlike(post.id)}
                    ></i>
                  ) : (
                    <i
                      className="far fa-thumbs-up"
                      onClick={() => handleLike(post.id)}
                    ></i>
                  )}
                  {post.likes}
                </span>
                <Link to={`/post/${post.id}`}>
                  <img
                    className="white-reply-icon"
                    src={replyicon}
                    alt="reply-icon"
                  />{' '}
                  {post.comments}
                </Link>
              </p>
            </StyledPost>
          </div>
        );
      })}
      <div className="pagination">
        {Number(props.page) > 1 ? <Link className='pag-prev-arrow' to={`/room/${props.id}/page/${Number(props.page) - 1}`}>Prev</Link> : null}
        {blocks.map((page) => {
          return page;
        })}
        {blocks.length > 1 && Number(props.page) !== props.totalPages ? <Link className='pag-prev-arrow' to={`/room/${props.id}/page/${Number(props.page) + 1}`}>Next</Link> : null}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='FAQ'
        style={customStyles}
        shouldCloseOnOverlayClick={false}>
        <CreatePostContainer>
          {props.rooms.filter(item => item.id == props.id).map(item => <h1 key={item.id} className="single-room-name">{item.room_name}</h1>)}
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
    usersLikedPosts: state.usersLikedPosts,
    totalPages: state.totalPages
  };
};

export default connect(mapStateToProps, { like, unlike, postQuestion, fetchPostByRoom, fetchPostByRoomByPopular, fetchUsersLikedPosts })(RoomBody);
