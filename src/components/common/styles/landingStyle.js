import styled from 'styled-components';

const LandingContainer = styled.div`
  height: 100vh;
  background-color: white;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .left-section-container {
    text-align: center;
    align-items: center;
    .left-section {
      max-width: 372.6px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .logo-and-name {
        font-family: serif;
        align-items:center;
        margin-bottom: 4px;
        display: flex;
        flex-direction: column;
        img {
          width: 50%;
          height: 45%;
          margin-right: 8px;
          margin-bottom: 15px;
        }

        h1 {
          font-size: 1.9rem;
          font-weight: 550;
          color: #ec3944;
        }
      }

      .description {
        margin: 0 10%;
        font-size: 1.1rem;
<<<<<<< HEAD
        color: #000;
=======
        color: black;
>>>>>>> 1fd20fc3263469128a8e4dbae27d09f027691deb
      }
    }
  }

  .right-section-container {
    text-align:center;
    .right-section {
      max-width: 372.6px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h2 {
        margin-bottom: 16px;
        font-size: 1.75rem;
        font-weight: 600;
<<<<<<< HEAD
        color: #000;
=======
        color: black;
>>>>>>> 1fd20fc3263469128a8e4dbae27d09f027691deb
      }

      .social-media-link {
        text-decoration: none;

        :last-of-type {
          button {
            margin-bottom: 8px;
          }
        }
      }

      button {
        margin: 0 auto;
        box-shadow:inset 0px 1px 0px 0px #ffffff;
        background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
        background-color:#ededed;
        border:1px solid #dcdcdc;
        color:#777777;
        text-decoration:none;
        text-shadow:0px 1px 0px #ffffff;
        width: 275px;
        padding: 10px 0;
        margin-bottom: 12px;
        border-radius: 3px;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        font-weight: 600;
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
          background:linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
          background-color:#dfdfdf;
        }
      }

      .terms {
<<<<<<< HEAD
        font-size: 1.1rem;
        color: #000;

        a {
          color: #000;
=======
        font-size: .7rem;
        color: black;
        margin: 0 10%;

        a {
          color: black;
>>>>>>> 1fd20fc3263469128a8e4dbae27d09f027691deb
          transition: 0.25s;

          :hover {
            opacity: 0.5;
          }
        }
      }

      .instead {
        font-size: 0.875rem;
<<<<<<< HEAD
        color: #000;
=======
        color: black;
>>>>>>> 1fd20fc3263469128a8e4dbae27d09f027691deb

        a {
          color: #000;
          transition: 0.25s;

          :hover {
            opacity: 0.5;
          }
        }
      }
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row;

    .left-section-container {
      width: 50%;
      

      .left-section {
        height: 90vh;
        margin: 0 10% 0 auto;
        
      }
    }

    .right-section-container {
      width: 50%;

      .right-section {
        height: 90vh;
        margin: 0 10%;
        
      }
    }
  }
`;

export default LandingContainer;
