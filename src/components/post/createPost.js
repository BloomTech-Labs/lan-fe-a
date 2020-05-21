import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postQuestion } from '../../actions';
import Header from '../common/header';
import CreatePostContainer from './styles/createPostStyle';

const CreatePost = props => {
    const [category, setCategory] = useState('');
    const [input, setInput] = useState({
        question: '',
        answer: ''
    });
    const [error, setError] = useState({
        checkbox: '',
        question: '',
        answer: ''
    });

    const onChange = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = event => {
        event.preventDefault();
        if (category === '') {
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
            props.postQuestion(input.question, input.answer, props.user.track, category, props.history)
                .then(response => {
                    console.log(response);
                    props.history.push('/');
                })
                .catch(error => {
                    console.log(error);
                    setError({
                        checkbox: '',
                        question: '',
                        answer: 'An entry exceeds the character limit'
                    });
                });
        };
    };

    return (
        <>
            <Header history={props.history} />
            <CreatePostContainer category={category}>
                <h2>Post a question</h2>
                <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                    <p className='category'>Category</p>
                    <div className='categories'>
                        <button type='button' onClick={() => setCategory('Behavioral')}>Behavioral</button>
                        <button type='button' onClick={() => setCategory('Technical')}>Technical</button>
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