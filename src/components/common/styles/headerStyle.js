import styled from 'styled-components';

const HeaderContainer = styled.div`
  height: 72px;
  width: 90%;
  margin: 2% auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  header {
    font-family: 'Tiempos Headline', serif;
    font-weight: 500;
    font-size: 3rem;
    color: #ec3944;
    margin-left: 0.8%;
    margin-bottom: 0.85%;
    text-shadow: 2px 2px 5px #000000;
  }
  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.25s;
    img {
      background-color: #0d0d0d;
      margin-right: 16px;
      height: 32px;
      width: 20%;
      height: 35%;
      // width: 32px;
      /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
    }

    h1 {
      margin-right: 16px;
      font-size: 1.75rem;
      font-weight: 800;
      color: #ffffff;
      display: none;
    }

    :hover {
      opacity: 0.5;
    }
  }

  form {
    max-width: 691.2px;
    width: 100%;
    display: flex;

    input {
      width: 100%;
      padding: 10px;
      background-color: #141414;
      border: none;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      font-family: 'Nunito', sans-serif;
      font-size: 1.2rem;
      color: #ffffff;
      /* box-shadow: 2px 2px 5px #000000; */
      ::placeholder {
        color: #141414;
      }
    }

    button {
      padding: 15px;
      background-color: #141414;
      border: none;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      cursor: pointer;

      i {
        font-size: 1rem;
        color: dimgray;
        transition: 0.25s;
      }

      :hover {
        i {
          opacity: 0.5;
        }
      }
    }
  }

  .profile-picture {
    height: 52px;
    width: 52px;
    margin-left: 16px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.25s;

    :hover {
      opacity: 0.5;
    }
  }

  .dropdown-content.hidden {
    display: none;
  }

  .dropdown-content.visible {
    width: 200px;
    background: #2c2f33;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 5%;
    z-index: 9999;

    a {
      text-decoration: none;
      border-bottom: 1px solid #23272a;
    }

    p {
      padding: 12px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
      transition: 0.25s;

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

    #admin {
      height: 1.15rem;
      margin-left: -2px;
      margin-right: 5.5px;
    }
    #mod {
      height: 1.15rem;
      margin-left: -2px;
      margin-right: 5.5px;
    }
  }

  @media (min-width: 768px) {
    width: 95%;

    .logo {
      img {
        margin-right: 8px;
      }

      h1 {
        display: initial;
      }
    }

    .dropdown {
      right: 2.5%;
    }
  }
`;

export default HeaderContainer;
