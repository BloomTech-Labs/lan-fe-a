import Model from 'react-modal';
import styled from 'styled-components';

const StyledModel = styled(Model)`
  width: 50%;
  height: 50%;
  background-color: white;
  margin: 10% auto;

  .fpm {
    display: flex;
    flex-direction: column;
  }

  .fpm-top {
    background-color: grey;
    width: 100%;
    display: flex;

    div h1 {
      align-items: center;
    }

    h1 {
      justify-content: center;
      margin: auto;
    }

    button {
      width: 100%;
      margin: 5px;
    }
  }

  .fpm-bottom {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      justify-content: center;
    }
  }

  button {
    padding: 12px 26px;
    width: 50%;
    border-radius: 5px;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #000000;
    cursor: pointer;
    transition: 0.25s;
    border: 1px solid grey;
    :hover {
      opacity: 0.5;
    }
  }
`;

export default StyledModel;