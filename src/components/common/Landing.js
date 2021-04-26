/* eslint-disable no-undef */
import React, { useState } from 'react';
import Loader from './Loader';
import LandingContainer from './styles/landingStyle';
import linkedin from '../../img/linkedin.svg';
import redlambda from '../../img/redlambda.png';
const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const Landing = () => {
  const [fetching, setFetching] = useState(false);
  return (
    <>
      {fetching ? (
        <Loader message={true} />
      ) : (
        <LandingContainer>
          <div className="left-section-container">
            <div className="left-section">
              <div className="logo-and-name">
                <img src={redlambda} alt="Lambda School logo" />
                <h1> Alumni Network</h1>
              </div>
              <p className="description">
                A community platform for Lambda School alumni
              </p>
            </div>
          </div>
          <div className="right-section-container">
            <div className="right-section">
              <h2>Get Started</h2>
              <a
                className="social-media-link"
                href={`${BACKEND_URL}/api/auth/linkedin`}
                onClick={() => setFetching(true)}
              >
                <button>
                  <img src={linkedin} alt="LinkedIn logo" />
                  Continue with LinkedIn
                </button>
              </a>
              <p className="terms">
                *By continuing, you agree to Lambda Alumni Network&apos;s Terms
                and Privacy Policy.
              </p>
            </div>
          </div>
        </LandingContainer>
      )}
    </>
  );
};

export default Landing;
