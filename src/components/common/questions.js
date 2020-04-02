import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import { Link } from 'react-router-dom';
import QuestionsContainer from './styles/questionsStyle';

const Questions = props => {
    return (
        <QuestionsContainer>
            {props.posts.length > 0 ? (
                props.posts.map((item, index) => (
                    <Link to={`/post/${item.id}`}>
                        <div key={index} className='question-card'>
                            <div className='left'>
                                <Link to={`/user/${item.user_id}`}><img src={item.profile_picture} alt='profile icon' /></Link>
                            </div>
                            <div className='right'>
                                <Link to={`/user/${item.user_id}`}><p className='display-name'>{item.display_name}</p></Link>
                                <div className='tags'>
                                    <button>{item.track}</button>
                                    <button>{item.category}</button>
                                </div>
                                <p className='question'>{item.question}</p>
                                <p className='answer'>{item.answer}</p>
                                <div className='activity'>
                                    <p><i className='far fa-thumbs-up'></i>{item.likes}</p>
                                    <p><i className='far fa-comment'></i>{item.comments}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className='no-posts-found'>
                    <p><i className='fas fa-exclamation'></i>No posts found</p>
                </div>
            )}
        </QuestionsContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        posts: state.posts
    };
};

export default connect(mapStateToProps, { fetchPosts })(Questions);