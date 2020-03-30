import React, { useState } from 'react';
import styled from 'styled-components';

const CareerCoachContainer = styled.div`
    height: 90vh;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
        margin-bottom: 4px;
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
        line-height: 36px;
    }

    .instructions {
        margin-bottom: 16px;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        
        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 8px;
            background-color: #2c2f33;
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            color: #ffffff;
        }

        .error {
            font-size: 0.875rem;
            font-weight: 500;
            color: #ea4335;
        }

        .buttons {
            margin-top: 32px;
            display: flex;
            justify-content: flex-end;
    
            button {
                padding: 10px 32px;
                background: linear-gradient(to right, #0072ff, #00c6ff);
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 1rem;
                font-weight: 500;
                color: #ffffff;
                cursor: pointer;
                transition: 0.25s;
    
                i {
                    margin-right: 4px;
                    font-size: 0.75rem;
                }
    
                :hover {
                    opacity: 0.5;
                }
            }

            button:last-child {
                margin-left: 12px;
                
                i {
                    margin-right: 0;
                    margin-left: 4px;
                }
            }
        }
    }

    @media (min-width: 414px) {
        width: 372.6px;
    }
`;

const CareerCoach = props => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const onChange = event => {
        setInput(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        setError('Invalid viewee token');
    };

    return (
        <CareerCoachContainer>
            <h1>Enter your viewee token</h1>
            <p className='instructions'>As a career coach, your questions and replies will be prioritized.</p>
            <form onSubmit={onSubmit} autoComplete='off' spellCheck='false'>
                <input type='text' name='input' placeholder='Enter your viewee token' value={input} onChange={onChange} />
                <p className='error'>{error}</p>
                <div className='buttons'>
                    <button type='button' onClick={() => props.history.push('/onboarding')}><i className='fas fa-chevron-left'></i>Go back</button>
                    <button type='submit'>Continue<i className='fas fa-chevron-right'></i></button>
                </div>
            </form>
        </CareerCoachContainer>
    );
};

export default CareerCoach;