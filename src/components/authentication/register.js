import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterContainer from './styles/registerStyle';
import viewee from '../../img/viewee.png';

const Register = () => {
  const [input, setInput] = useState({
    email: '',
    display_name: '',
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
    <RegisterContainer>
      <form onSubmit={onSubmit} autoComplete='off' spellCheck='false'>
        <img src={viewee} alt='viewee logo' />
        <h2>Register to start viewing, answering, and posting tech interview questions!</h2>

        <label htmlFor='email'>Email</label>
        <input name='email' type='email' value={input.email} onChange={onChange} placeholder='Enter an email' />

        <label htmlFor='display_name'>Display name</label>
        <input name='display_name' type='text' value={input.display_name} onChange={onChange} placeholder='Enter a display name' />

        <label htmlFor='password'>Password</label>
        <input name='password' type='password' value={input.password} onChange={onChange} placeholder='Enter a password' />

        <button type='submit'>Submit</button>

        <p className='terms'>By registering, you agree to our <Link to='/termsofservice'>Terms of Service</Link> and <Link to='/privacypolicy'>Privacy Policy</Link>.</p>

        <p className='prompt'>Already have an account? Log in <Link to='/login'>here</Link>.</p>
      </form>
    </RegisterContainer>
  );
};

export default Register;