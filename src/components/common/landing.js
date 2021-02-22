import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Loader from './loader';
import LandingContainer from './styles/landingStyle';
// import lambdaschool from '../../img/lambdaschool.png';
// import google from '../../img/google.png';
import linkedin from '../../img/linkedin.svg';
// import facebook from '../../img/facebook.png';
// import twitter from '../../img/twitter.png';
import whitelambda from '../../img/whitelambda.png';
const BACKEND_URL = process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const Landing = props => {
    const [fetching, setFetching] = useState(false);
    
    useEffect(() => {
        if (localStorage.getItem('id')) {
            props.history.push('/');
        };
    }, []);

    return (
        <>
            {fetching ? <Loader message={true} /> : (
                <LandingContainer>
                    <div className='left-section-container'>
                        <div className='left-section'>
                            <div className='logo-and-name'>
                                <img src={whitelambda} alt='Lambda School logo' />
                                <h1>Lambda Alumni Network</h1>
                            </div>
                            {/* <p className='description'>Prepare for tech interviews with viewee! Browse an array of questions fellow Lambda School students have received during interviews, view input from career coaches and how other students would answer, and post questions you have received and how you responded for feedback.</p> */}
                            <p className='description'>A community platform for Lambda School alumni</p>
                        </div>
                    </div>
                    <div className='right-section-container'>
                        <div className='right-section'>
                            <h2>Get Started</h2>
                            {/* <a className='social-media-link' href={`${BACKEND_URL}/api/auth/google`} onClick={() => setFetching(true)}>
                                <button>
                                    <img src={google} alt='Google logo' />
                                    Continue with Google
                                </button>
                            </a> */}
                            <a className='social-media-link' href={`${BACKEND_URL}/api/auth/linkedin`} onClick={() => setFetching(true)}>
                                <button>
                                    <img src={linkedin} alt='LinkedIn logo' />
                                    Continue with LinkedIn
                                </button>
                            </a>
                            {/* <a className='social-media-link' href={`${BACKEND_URL}/api/auth/facebook`} onClick={() => setFetching(true)}>
                                <button>
                                    <img src={facebook} alt='Facebook logo' />
                                    Continue with Facebook
                                </button>
                            </a>
                            <a className='social-media-link' href={`${BACKEND_URL}/api/auth/twitter`} onClick={() => setFetching(true)}>
                                <button>
                                    <img src={twitter} alt='Twitter logo' />
                                    Continue with Twitter
                                </button>
                            </a> */}
                            <p className='terms'>By continuing, you agree to viewee's Terms and Privacy Policy.</p>
                            {/* <p className='terms'>By continuing, you agree to our <Link to='/termsofservice'>Terms of Service</Link> and <Link to='/privacypolicy'>Privacy Policy</Link>.</p> */}
                            {/* <p className='instead'>Register with a username and password <Link to='/register'>instead</Link>.</p> */}
                        </div>
                    </div>
                </LandingContainer>
            )}
        </>
    );
};

export default Landing;