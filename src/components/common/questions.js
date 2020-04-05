import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import Question from './question';
import QuestionsContainer from './styles/questionsStyle';

const Questions = props => {
    useEffect(() => props.fetchPosts(props.search), []);

    return (
        <QuestionsContainer>
            {props.posts.length > 0 ? props.posts.map((item, index) => <Question key={index} post={item} />) : (
                <div className='no-posts-found'>
                    <p><i className='fas fa-exclamation'></i>No posts found</p>
                </div>
            )}
        </QuestionsContainer>
    );
};

const mapStateToProps = state => {
    return {
        posts: state.posts,
        search: state.search
    };
};

export default connect(mapStateToProps, { fetchPosts })(Questions);