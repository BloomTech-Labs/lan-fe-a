import React from 'react';
import styled from 'styled-components';

const LandingContainer = styled.div`
    height: 90vh;

    .container {
        height: 85vh;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            margin-bottom: 4px;
            font-size: 1.75rem;
            font-weight: 700;
        }

        p {
            margin-bottom: 12px;
            font-size: 1rem;
            font-weight: 400;
            text-align: center;
        }

        button {
            padding: 12px 48px;
            background: linear-gradient(to right, #00c6ff, #0072ff);
            // background: linear-gradient(to right, #FF512F, #DD2476);
            border: none;
            border-radius: 3px;
            font-family: 'Quicksand', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            color: white;
            cursor: pointer;
            transition: 0.5s;
        }
    }
`

const Landing = () => {
    return (
        <LandingContainer>
            <div className='container'>
                <h2>Interview questions</h2>
                <p>Answer, view, and post job interview questions</p>
                <button>Get Started</button>
            </div>
        </LandingContainer>
    );
};

export default Landing;