import styled from 'styled-components';

const PostContainer = styled.div`
  width: 95%;
  padding: 50px 50px 0;
  margin: 0 auto;
  margin-top: 32px;
  margin-bottom: 64px;
  background-color: #141414;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;

  .post {
    margin-bottom: 64px;
    display: flex;
    position: relative;
    border-radius: 10px;
    padding: 2.5%;
    border: 1.2px solid #686868;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
    /* border-image: linear-gradient(to bottom, grey, rgba(0, 0, 0, 0)) 1 100%; */

    .left-section {
      img {
        margin-right: 16px;
        height: 42px;
        width: 42px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.25s;

        :hover {
          opacity: 0.5;
        }
      }
    }

    .right-section {
      width: 90%;

      .user {
        margin-bottom: 6px;
        display: flex;
        align-items: center;

        .display-name {
          margin-right: 8px;
          font-size: 1.3rem;
          font-weight: 545;
          color: #ffffff;
          cursor: pointer;
          transition: 0.25s;
          text-transform: capitalize;
          :hover {
            opacity: 0.5;
          }
        }

        .timestamp {
          font-size: 0.9rem;
          font-weight: 500;
          color: #ffffff;
        }
      }

      .labels {
        margin-bottom: 4px;
        display: flex;
        align-items: center;

        button {
          padding: 1px 2px;
          margin-right: 4px;
          background: linear-gradient(to right, #0084ff, #0099ff);
          border: none;
          border-radius: 3px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          color: #ffffff;
        }

        .career-coach {
          background: #ffcb37;
          color: #23272a;
        }
      }

      .question {
        margin-bottom: 6px;
        font-size: 1.2rem;
        font-weight: 545;
        color: #ffffff;
      }

      .answer {
        margin-bottom: 15px;
        font-size: 1rem;
        font-weight: 400;
        color: darkgrey;
      }

      .activity {
        display: flex;
        align-items: center;

        p {
          margin-right: 16px;
          font-size: 0.875rem;
          font-weight: 480;
          color: #ffffff;

          i {
            margin-right: 4px;
          }
          .fa-chevron-up {
            color: #0099ff;
            cursor: pointer;
            transition: 0.1s;
          }

          .fa-chevron-up:active {
            transform: scale(1.25);
          }

          .white {
            color: #ffffff;
          }

          .blue {
            color: #0099ff;
          }
        }
      }
    }

    .more-options {
      color: #ffffff;
      height: 3vh;
      padding: 5px;
      display: flex;
      align-items: center;
      transition: 0.25s;
      :hover {
        opacity: 0.5;
      }
    }

    .dropdown {
      width: 200px;
      background: #242323;
      border-radius: 3px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 43px;
      right: 0;
      margin-right: 20px;
      z-index: 9999;

      a,
      button {
        text-decoration: none;
        border-bottom: 1px solid #23272a;
        padding: 12px;
        font-size: 0.875rem;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
        transition: 0.25s;
        background-color: unset;
        border: none;
        text-align: left;
        border: 1px solid darkgrey;
        :nth-child(4) {
          border-bottom: 1px solid #23272a;
        }

        i {
          margin-right: 8px;
          font-size: 0.875rem;
        }

        :hover {
          opacity: 0.5;
        }
      }
    }
  }

  form {
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 4px;
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
    }

    textarea {
      background-color: #242323;
      min-height: 44px;
      min-width: 100%;
      max-width: 100%;
      height: 144px;
      padding: 10px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border: none;
      border-radius: 15px;
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;

      ::placeholder {
        color: dimgray;
      }
    }

    .error {
      margin-top: 4px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #ea4335;
    }

    .button {
      display: flex;
      justify-content: flex-end;

      button {
        padding: 12px 26px;
        margin-top: 16px;
        background: linear-gradient(to right, #000000, #212121, #424949);
        border-radius: 5px;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        transition: 0.25s;
        border: 1px solid grey;
        /* box-shadow: 3px 3px 6px #888888; */
        :hover {
          opacity: 0.5;
        }
      }
    }
  }

  .comments {
    .filter {
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      label {
        margin-right: 8px;
        font-weight: 700;
        color: #ffffff;
      }

      select {
        margin-right: 20px;
        padding: 1%;
        background-color: #2c2f33;
        border: none;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        background-color: #242323;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    }

    .no-comments-yet {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        margin: 64px 0;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        align-items: center;

        i {
          margin-right: 8px;
          font-size: 0.875rem;
        }
      }
    }
  }

  @media (min-width: 768px) {
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 972.8px;
  }
`;

export default PostContainer;
