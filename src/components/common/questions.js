import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import QuestionsContainer from './styles/questionsStyle';

const Questions = props => {
    return (
        <QuestionsContainer>
            {props.posts.length > 0 ? (
                props.posts.map((item, index) => (
                    <div key={index} className='question-card'>
                        <div className='left'>
                            <img src={item.profile_picture} alt='profile icon' />
                        </div>
                        <div className='right'>
                            <p className='display-name'>{item.display_name}</p>
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