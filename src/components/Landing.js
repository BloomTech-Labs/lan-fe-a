import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import viewee from '../img/viewee.png';
import google from '../img/google.png';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.png';

const LandingContainer = styled.div`
    .container {
        width: 90%;
        margin: 0 auto;

        .left-section {
            height: 50vh;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .logo-and-name {
                margin-bottom: 4px;
                display: flex;
                align-items: center;

                img {
                    height: 32px;
                    width: 32px;
                    margin-right: 8px;
                }

                h1 {
                    font-size: 2rem;
                    color: #ffffff;
                }
            }
            
            .description {
                font-size: 1rem;
                color: #ffffff;
            }
        }

        .right-section {
            display: flex;
            flex-direction: column;

            button {
                padding: 10px;
                margin-bottom: 12px;
                background-color: #2c2f33;
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 1rem;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: 0.25s;

                img {
                    margin-right: 8px;
                    height: 24px;
                    width: 24px;
                }

                :hover {
                    opacity: 0.5;
                }
            }

            .instead {
                margin-bottom: 12px;
                font-size: 0.875rem;
                color: #ffffff;

                a {
                    color: #ffffff;
                    transition: 0.25s;

                    :hover {
                        opacity: 0.5;
                    }
                }
            }

            .terms {
                font-size: 0.875rem;
                color: #ffffff;

                a {
                    color: #ffffff;
                    transition: 0.25s;

                    :hover {
                        opacity: 0.5;
                    }
                }
            }
        }
    }
`

const Landing = () => {
    return (
        <LandingContainer>
            <div className='container'>
                <div className='left-section'>
                    <div className='logo-and-name'>
                        <img src={viewee} alt='viewee logo' />
                        <h1>viewee</h1>
                    </div>
                    <p className='description'>Answer, view, and post job interview questions</p>
                </div>

                <div className='right-section'>
                    <button className='google-button'>
                        <img src={google} alt='google logo' />
                        Continue with Google
                    </button>
                    <button className='facebook-button'>
                        <img src={facebook} alt='facebook logo' />
                        Continue with Facebook
                    </button>
                    <button className='twitter-button'>
                        <img src={twitter} alt='twitter logo' />
                        Continue with Twitter
                    </button>
                    <p className='instead'>Register with a username and password <Link to='/register'>instead</Link>.</p>
                    <p className='terms'>By continuing, you agree to our <Link to='/termsofservice'>Terms of Service</Link> and <Link to='/privacypolicy'>Privacy Policy</Link>.</p>
                </div>
            </div>
        </LandingContainer>
    );
};

export default Landing;