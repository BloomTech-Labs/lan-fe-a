import React, { useState } from 'react';
import Header from './header';
import PostContainer from './styles/postStyle';

const Post = props => {
    const [categories, setCategories] = useState([
        { category: 'Screening', value: false},
        { category: 'Technical', value: false}
    ]);
    const [input, setInput] = useState({
        question: '',
        answer: ''
    });
    const [error, setError] = useState({
        checkbox: '',
        question: '',
        answer: ''
    });

    const toggleCategory = category => {
        setCategories(categories.map(item => item.category === category ? { ...item, value: true } : { ...item, value: false }));
    };

    const onChange = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = event => {
        event.preventDefault();
        if (!categories.find(item => item.value === true)) {
            setError({
                ...error,
                checkbox: 'Please choose a category'
            });
        } else if (categories.find(item => item.value === true)) {
            setError({
                ...error,
                checkbox: ''
            });
        } else if (input.question === '') {
            setError({
                ...error,
                question: 'Please enter a question'
            });
        } else if (input.question !== '') {
            setError({
                ...error,
                question: ''
            });
        } else if (input.answer === '') {
            setError({
                ...error,
                answer: 'Please enter an answer'
            });
        } else if (input.answer !== '') {
            setError({
                ...error,
                answer: ''
            });
        } else {

        };
    };

    return (
        <>
            <Header history={props.history} />
            <PostContainer categories={categories}>
                <h2>Post a question</h2>
                <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                    <p className='category'>Category</p>
                    <div className='checkboxes'>
                        <button type='button' onClick={() => toggleCategory('Screening')}>Screening</button>
                        <button type='button' onClick={() => toggleCategory('Technical')}>Technical</button>
                    </div>
                    {error.checkbox && <p className='error'>{error.checkbox}</p>}

                    <label>Question</label>
                    <input type='text' name='question' placeholder='Enter the question' value={input.question} onChange={onChange} />

                    <label>Text</label>
                    <textarea type='text' name='answer' placeholder='Explain how you answered and any other thoughts' value={input.answer} onChange={onChange} />
                    
                    <div className='buttons'>
                        <button type='button' onClick={() => props.history.push('/')}><i className='fas fa-times'></i>Cancel</button>
                        <button type='submit'><i className='fas fa-check'></i>Submit</button>
                    </div>
                </form>
            </PostContainer>
        </>
    );
};

export default Post;