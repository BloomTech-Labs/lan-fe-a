import React from 'react';
import moment from 'moment';
import CommentContainer from './styles/commentStyle.js';

const Comment = props => {
    return (
        <CommentContainer>
            <img src={props.comment.profile_picture} alt='profile icon' onClick={() => props.history.push(`/user/${props.comment.user_id}`)} />
            <div className='right-section'>
                <div className='user'>
                    <p className='display-name' onClick={() => props.history.push(`/user/${props.comment.user_id}`)}>{props.comment.display_name}</p>
                    <p className='timestamp'>{moment(props.comment.created_at).fromNow()}</p>
                </div>

                <p className='answer'>{props.comment.comment}</p>

                <p className='likes'><i className='far fa-thumbs-up'></i>{props.comment.likes}</p>
            </div>
        </CommentContainer>
    );
};

export default Comment;