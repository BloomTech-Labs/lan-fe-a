import React from 'react';
import { Link } from 'react-router-dom';
import LandingContainer from './styles/landingStyle';
import viewee from '../../img/viewee.png';
import google from '../../img/google.png';
import facebook from '../../img/facebook.png';
import twitter from '../../img/twitter.png';

const Landing = () => {
    return (
        <LandingContainer>
            <div className='left-section-container'>
                <div className='left-section'>
                    <div className='logo-and-name'>
                        <img src={viewee} alt='viewee logo' />
                        <h1>viewee</h1>
                    </div>
                    <p className='description'>Prepare for tech interviews with viewee! Browse an array of questions fellow Lambda School students have received during interviews. View input from career coaches and how other students would answer. Post questions you have received and how you responded for critique.</p>
                </div>
            </div>
            <div className='right-section-container'>
                <div className='right-section'>
                    <h2>Get Started</h2>
                    <a className='social-media-link' href='http://localhost:5000/api/auth/google'>
                        <button className='google-button'>
                            <img src={google} alt='google logo' />
                            Continue with Google
                        </button>
                    </a>
                    <a className='social-media-link' href='http://localhost:5000/api/auth/facebook'>
                        <button className='facebook-button'>
                            <img src={facebook} alt='facebook logo' />
                            Continue with Facebook
                        </button>
                    </a>
                    <a className='social-media-link' href='http://localhost:5000/api/auth/twitter'>
                        <button className='twitter-button'>
                            <img src={twitter} alt='twitter logo' />
                            Continue with Twitter
                        </button>
                    </a>
                    <p className='terms'>By continuing, you agree to our <Link to='/termsofservice'>Terms of Service</Link> and <Link to='/privacypolicy'>Privacy Policy</Link>.</p>
                    {/* <p className='instead'>Register with a username and password <Link to='/register'>instead</Link>.</p> */}
                </div>
            </div>
        </LandingContainer>
    );
};

export default Landing;