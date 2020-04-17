import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchPost, postComment } from '../../actions';
import moment from 'moment';
import Header from './header';
import PostContainer from './styles/postStyle';

const Post = props => {
    const postID = props.match.params.id;

    const [input, setInput] = useState('');
    
    useEffect(() => props.fetchPost(postID), []);

    const onChange = event => {
        setInput(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        props.postComment(props.user, Number(postID), input);
        setInput('');
    };

    return (
        <>
            <Header history={props.history} />
            <PostContainer>
                <div className='post'>
                    <div className='left-section'>
                        {props.currentPost.profile_picture && <img src={props.currentPost.profile_picture} alt='profile icon' onClick={() => props.history.push(`/user/${props.currentPost.user_id}`)} />}
                    </div>
                    <div className='right-section'>
                        <div className='user'>
                            {props.currentPost.display_name && <p className='display-name' onClick={() => props.history.push(`/user/${props.currentPost.user_id}`)}>{props.currentPost.display_name}</p>}
                            {props.currentPost.created_at && <p className='timestamp'>{moment(props.currentPost.created_at).fromNow()}</p>}
                        </div>
                        <div className='labels'>
                            {props.currentPost.track && <button>{props.currentPost.track}</button>}
                            {props.currentPost.category && <button>{props.currentPost.category.toUpperCase()}</button>}
                        </div>
                        {props.currentPost.question && <p className='question'>{props.currentPost.question}</p>}
                        {props.currentPost.answer && <p className='answer'>{props.currentPost.answer}</p>}
                        <div className='activity'>
                            {props.currentPost.likes !== undefined && <p><i className='far fa-thumbs-up'></i>{props.currentPost.likes}</p>}
                            {props.currentPost.comments && <p><i className='far fa-comment'></i>{props.currentPost.comments.length}</p>}
                        </div>
                    </div>
                </div>

                <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                    <label htmlFor='comment'>Comment</label>
                    <textarea name='comment' type='text' placeholder='How would you approach this question? Any advice or feedback?' value={input} onChange={onChange} required />
                    <div className='button'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>

                <div className='comments'>
                    <div className='filter'>
                        <label htmlFor='sort'>SORT</label>
                        <select name='sort'>
                            <option value='Recent'>Recent</option>
                            <option value='Popular'>Popular</option>
                        </select>
                    </div>

                    {props.currentPost.comments && props.currentPost.comments.map((item, index) => (
                        <div className='comment' key={index}>
                            <img src={item.profile_picture} alt='profile icon' onClick={() => props.history.push(`/user/${item.user_id}`)} />
                            <div className='right-section'>
                                <div className='user'>
                                    <p className='display-name' onClick={() => props.history.push(`/user/${item.user_id}`)}>{item.display_name}</p>
                                    <p className='timestamp'>{moment(item.created_at).fromNow()}</p>
                                </div>

                                <p className='answer'>{item.comment}</p>

                                <p className='likes'><i className='far fa-thumbs-up'></i>{item.likes}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </PostContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        currentPost: state.currentPost
    };
};

export default connect(mapStateToProps, { fetchUser, fetchPost, postComment })(Post);