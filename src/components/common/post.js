import React from 'react';
import Header from './header';
import PostContainer from './styles/postStyle';

const Post = props => {
    const postID = props.match.params.id;
    
    return (
        <>
            <Header history={props.history} />
            <PostContainer>

            </PostContainer>
        </>
    );
};

export default Post;