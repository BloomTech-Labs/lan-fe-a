import styled from 'styled-components';

const StyledModalContainer = styled.div`
  transition: 0.25s;

  img {
    height: 40px;
    margin-bottom: 8px;
  }

  h2 {
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-weight: 600;
    margin-bottom: 8px;
  }

  .single-button-container {
    display: flex;
    justify-content: flex-end;
  }

  .double-button-container {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin-top: 40px;
    padding: 10px 24px;
    background-color: #ec3944;
    border: none;
    border-radius: 3px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    transition: 0.25s;

    i {
      margin-right: 4px;
      font-size: 0.75rem;
    }

    :hover {
      opacity: 0.75;
    }
  }

  ul {
    font-weight: 600;
    padding: 0 0 16px 8px;
  }

  .text-align-center {
    text-align: center;
  }

  a {
    color: #ec3944;
  }
`;

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: '#f2f2f2',
    color: '#333',
    padding: '96px 64px',
    maxWidth: '500px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export default StyledModalContainer;