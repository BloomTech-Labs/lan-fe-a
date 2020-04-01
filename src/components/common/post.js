import React from 'react';
import Header from './header';
import PostContainer from './styles/postStyle';

const Post = props => {
    return (
        <>
            <Header history={props.history} />
            <PostContainer>
                <h2>Post a question</h2>
                <form autoComplete='off' spellCheck='false'>
                    <label>Question</label>
                    <input placeholder='Write the question' />

                    <label>Text</label>
                    <textarea placeholder='Explain how you answered and any other thoughts'></textarea>
                    
                    <div className='buttons'>
                        <button type='button'><i className='fas fa-times'></i>Cancel</button>
                        <button type='submit'><i className='fas fa-check'></i>Submit</button>
                    </div>
                </form>
            </PostContainer>
        </>
    );
};

export default Post;