import styled from 'styled-components';

const FAQContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 32px;
  margin-bottom: 64px;

  h2 {
    margin-bottom: 32px;
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
  }

  .question {
    margin-bottom: 4px;
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }

  .answer {
    margin-bottom: 32px;
    font-size: 1rem;
    font-weight: 300;
    color: #ffffff;

    a {
      color: #ffffff;
    }
  }

  @media (min-width: 768px) {
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 972.8px;
  }
`;

export default FAQContainer;
