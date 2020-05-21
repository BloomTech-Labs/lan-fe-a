import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchUsersLikedPosts } from '../../actions';
import Question from './question';
import QuestionsContainer from './styles/questionsStyle';

const Questions = props => {
    useEffect(() => {
        // ? Default search query passed in 
        props.fetchPosts(props.search);
        props.fetchUsersLikedPosts();
    }, []);

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
        search: state.search,
        posts: state.posts
    };
};

export default connect(mapStateToProps, { fetchPosts, fetchUsersLikedPosts })(Questions);