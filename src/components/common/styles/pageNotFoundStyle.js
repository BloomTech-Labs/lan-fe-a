import styled from 'styled-components';

const PageNotFoundContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 16px;
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
  }

  button {
    padding: 10px 24px;
    background: linear-gradient(to right, #0072ff, #00c6ff);
    border: none;
    border-radius: 3px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #ffffff;
    transition: 0.25s;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }
`;

export default PageNotFoundContainer;
