import styled from 'styled-components';

const LoaderContainer = styled.div`
  background-color:white;
  height: 100vh;
  // height: calc(90vh - 72px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: ${(props) => (props.message ? '8px' : null)};
    height: 32px;
    width: 32px;
    animation: loading-icon-spin infinite 1s linear;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    color: black;
  }

  @keyframes loading-icon-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default LoaderContainer;
