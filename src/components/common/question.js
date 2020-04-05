import React from 'react';
import { connect } from 'react-redux';
import { like } from '../../actions';
import { Link } from 'react-router-dom';
import moment from 'moment';
import QuestionContainer from './styles/questionStyle';

const Question = props => {
    return (
        <QuestionContainer post={props.post}>
            <Link to={`/post/${props.post.id}`}>
                <div className='question-card'>
                    <div className='left'>
                        <Link to={`/user/${props.post.user_id}`}><img src={props.post.profile_picture} alt='profile icon' /></Link>
                    </div>
                    <div className='right'>
                        <div className='display-name-and-timestamp'>
                            <Link to={`/user/${props.post.user_id}`}><p className='display-name'>{props.post.display_name}</p></Link>
                            <p className='timestamp'>{moment(props.post.created_at).fromNow()}</p>
                        </div>
                        <div className='labels'>
                            <button>{props.post.track}</button>
                            <button>{props.post.category.toUpperCase()}</button>
                        </div>
                        <p className='question'>{props.post.question}</p>
                        <p className='answer'>{props.post.answer}</p>
                        <div className='activity'>
                            <p><Link to='/' onClick={() => props.like(props.post.id)}><i className='far fa-thumbs-up'></i></Link>{props.post.likes}</p>
                            <p><i className='far fa-comment'></i>{props.post.comments}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </QuestionContainer>
    );
};

export default connect(null, { like })(Question);