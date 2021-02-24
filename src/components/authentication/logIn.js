import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogInContainer from './styles/logInStyle';
import viewee from '../../img/viewee.png';

const LogIn = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const onChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
  };
    
  return (
    <LogInContainer>
      <form onSubmit={onSubmit} autoComplete='off' spellCheck='false'>
        <img src={viewee} alt='viewee logo' />
        <h2>Log in to your account</h2>

        <label htmlFor='email'>Email</label>
        <input name='email' type='text' value={input.email} onChange={onChange} placeholder='Enter your email' />

        <label htmlFor='password'>Password</label>
        <input name='password' type='password' value={input.password} onChange={onChange} placeholder='Enter your password' />

        <button type='submit'>Submit</button>

        <p className='prompt'>Don&apos;t have an account? Register <Link to='/register'>here</Link>.</p>
      </form>
    </LogInContainer>
  );
};

export default LogIn;