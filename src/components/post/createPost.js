import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postQuestion } from '../../actions';
import Header from '../common/header';
import CreatePostContainer from './styles/createPostStyle';

const CreatePost = props => {
    const [categories, setCategories] = useState([
        { category: 'Behavioral', value: false},
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
                checkbox: 'Please select a category',
                question: '',
                answer: ''
            });
        } else if (input.question === '') {
            setError({
                checkbox: '',
                question: 'Please enter a question',
                answer: ''
            });
        } else if (input.answer === '') {
            setError({
                checkbox: '',
                question: '',
                answer: 'Please enter an answer'
            });
        } else {
            setError({
                checkbox: '',
                question: '',
                answer: ''
            });
            props.postQuestion(input.question, input.answer, props.user.track, categories.find(item => item.value === true).category, props.history);
        };
    };

    return (
        <>
            <Header history={props.history} />
            <CreatePostContainer categories={categories}>
                <h2>Post a question</h2>
                <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                    <p className='category'>Category</p>
                    <div className='categories'>
                        <button type='button' onClick={() => toggleCategory('Behavioral')}>Behavioral</button>
                        <button type='button' onClick={() => toggleCategory('Technical')}>Technical</button>
                    </div>
                    {error.checkbox && <p className='error'>{error.checkbox}</p>}

                    <label>Question</label>
                    <input type='text' name='question' placeholder='Enter the question' value={input.question} onChange={onChange} />
                    {error.question && <p className='error'>{error.question}</p>}

                    <label>Text</label>
                    <textarea type='text' name='answer' placeholder='Explain how you answered and any other thoughts' value={input.answer} onChange={onChange} />
                    {error.answer && <p className='error'>{error.answer}</p>}
                    
                    <div className='buttons'>
                        <button type='button' onClick={() => props.history.push('/')}><i className='fas fa-times'></i>Cancel</button>
                        <button type='submit'>Submit<i className='fas fa-check'></i></button>
                    </div>
                </form>
            </CreatePostContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { postQuestion })(CreatePost);