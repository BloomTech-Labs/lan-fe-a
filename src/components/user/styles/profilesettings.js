import styled from 'styled-components';

const ProfileSettings = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  color: whitesmoke;
  margin: 1% auto;
  padding: 2%;
  h2 {
    margin-bottom: 32px;
    padding-bottom: 20px;
    font-size: 2rem;
    font-weight: 700;
    border-bottom: 1px solid #404040;
  }
  h3 {
    margin-bottom: 32px;
    font-size: 1.6rem;
    font-weight: 500;
  }
  h4 {
    margin-top: 2%;
  }
  .display-name {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* width: 80%; */
    margin: 0 auto;
    font-size: 1.5rem;
    .left-section {
      display: flex;
      width: 60%;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 1.3rem;
        font-weight: 500;
        color: whitesmoke;

        :first-child {
          margin-bottom: 4px;
          font-weight: 500;
        }
      }
    }
  }

  button {
    width: 60%;
    margin-top: 16px;
    margin-bottom: 4%;
    background: linear-gradient(to right, #000000, #212121);
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    transition: 0.25s;
    border: 1px solid grey;
    height: 45px;
    border-radius: 3px;
    :hover {
      opacity: 0.5;
    }
    i {
      padding: 2%;
    }
  }
  .deactivate {
    .fas {
      color: red;
    }
  }

  .update {
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    width: 70%;
    padding: 16px;
    margin-bottom: 16px;
    background-color: #282828;
    border-radius: 5px;
    button {
      display: flex;
      padding: 2%;
      justify-content: center;
      align-items: center;
    }
    label {
      margin-bottom: 4px;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
    }

    input {
      width: 60%;
      padding: 10px;
      margin-bottom: 16px;
      background-color: #383838;
      border: none;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;

      ::placeholder {
        color: dimgray;
      }
    }
    .track {
      b {
        font-weight: 500;
      }
    }
  }
`;

export default ProfileSettings;
