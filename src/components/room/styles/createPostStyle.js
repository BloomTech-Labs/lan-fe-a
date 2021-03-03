import styled from 'styled-components';

const CreatePostContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 32px;
  margin-bottom: 32px;
  img {
    width: 25%;
  }
  .create-post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-weight: 500;
      font-size: 2.5rem;
      letter-spacing: 1.5px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    .category {
      margin-bottom: 4px;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
    }

    .error {
      margin-top: 4px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #ea4335;
    }

    label {
      margin: 16px 0 4px;
      font-size: 1.3rem;
      font-weight: 500;
      color: #ffffff;
    }

    input {
      padding: 10px;
      background-color: #212121;
      border: none;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
      margin-top: 2%;
      ::placeholder {
        color: dimgray;
      }
    }

    textarea {
      min-height: 44px;
      min-width: 100%;
      max-width: 100%;
      height: 288px;
      padding: 10px;
      /* background-color: #2c2f33; */
      background-color: #212121;
      border: none;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
      margin-top: 2%;
      ::placeholder {
        color: dimgray;
      }
    }

    .buttons {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
      button:nth-child(1) {
        background: linear-gradient(to right, #e0e0e0, #e8e8e8, #f0f0f0);
        color: black;
        padding: 10px 24px;
        margin-left: 8px;
        border-radius: 27px;
        font-size: 1rem;
        font-weight: 600;
        border: 2px solid black;
        .fa-times {
          margin: 3px;
        }
        i {
          margin-right: 4px;
          font-size: 0.75rem;
        }
        transition: 0.25s;
        :hover {
          opacity: 0.5;
        }
      }
      button:nth-child(2) {
        padding: 10px 24px;
        margin-left: 8px;
        background: linear-gradient(to right, #000000, #212121);
        border-radius: 27px;
        border: 1px solid darkgrey;
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

      button:last-of-type {
        i {
          margin-right: 0px;
          margin-left: 4px;
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

export default CreatePostContainer;
