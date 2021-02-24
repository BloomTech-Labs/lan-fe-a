import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postQuestion } from '../../actions';
import Header from '../common/header';
import CreatePostContainer from './styles/createPostStyle';

const CreatePost = props => {
  const [category, setCategory] = useState('');
  const [input, setInput] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState({
    checkbox: '',
    title: '',
    description: ''
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
        title: '',
        description: ''
      });
    } else if (input.title === '') {
      setError({
        checkbox: '',
        title: 'Please enter a question',
        description: ''
      });
    } else if (input.description === '') {
      setError({
        checkbox: '',
        title: '',
        description: 'Please enter an answer'
      });
    } else {
      setError({
        checkbox: '',
        title: '',
        description: ''
      });
      props.postQuestion(input.title, input.description, props.user.track, category, props.history)
        .then(response => {
          console.log(response);
          props.history.push('/');
        })
        .catch(error => {
          console.log(error);
          setError({
            checkbox: '',
            title: '',
            description: 'An entry exceeds the character limit'
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
          <input type='text' name='title' placeholder='Enter the question' value={input.title} onChange={onChange} />
          {error.title && <p className='error'>{error.title}</p>}

          <label>Text</label>
          <textarea type='text' name='description' placeholder='Explain how you answered and any other thoughts' value={input.description} onChange={onChange} />
          {error.description && <p className='error'>{error.description}</p>}
                    
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