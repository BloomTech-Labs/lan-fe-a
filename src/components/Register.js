import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RegisterContainer = styled.div`
    margin: 32px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        max-width: 372.6px;
        width: 90%;
        display: flex;
        flex-direction: column;

        h2 {
            margin-bottom: 24px;
            font-size: 1.75rem;
            font-weight: 600;
            color: #ffffff;
        }

        label  {
            font-size: 1rem;
            color: #ffffff;
        }

        input {
            padding: 10px;
            margin-bottom: 12px;
            background-color: #2c2f33;
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            color: #ffffff;
        }

        button {
            padding: 10px;
            margin: 12px 0 8px;
            background: linear-gradient(to right, #00c6ff, #0072ff);
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            color: #ffffff;
            transition: 0.25s;
            cursor: pointer;

            :hover {
                opacity: 0.75;
            }
        }

        .terms {
            margin-bottom: 16px;
            font-size: 0.875rem;
            color: #ffffff;

            a {
                color: #ffffff;
            }
        }

        .prompt {
            font-size: 0.875rem;
            color: #ffffff;

            a {
                color: #ffffff;
            }
        }
    }

    @media(min-width: 375px) {
        height: calc(90vh - 72px);
        margin: 0;
    }
`

const Register = () => {
    const [input, setInput] = useState({
        email: '',
        username: '',
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
                <h2>Register to start viewing, answering, and posting tech interview questions!</h2>

                <label htmlFor='email'>Email</label>
                <input name='email' type='email' value={input.email} onChange={onChange} />

                <label htmlFor='username'>Username</label>
                <input name='username' type='text' value={input.username} onChange={onChange} />

                <label htmlFor='password'>Password</label>
                <input name='password' type='password' value={input.password} onChange={onChange} />

                <button type='submit'>Submit</button>

                <p className='terms'>By registering, you agree to our <Link to='/termsofservice'>Terms of Service</Link> and <Link to='/privacypolicy'>Privacy Policy</Link>.</p>

                <p className='prompt'>Already have an account? Log in <Link to='/login'>here</Link>.</p>
            </form>
        </RegisterContainer>
    );
};

export default Register;