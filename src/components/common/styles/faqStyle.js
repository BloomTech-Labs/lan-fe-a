import styled from 'styled-components';

const FAQContainer = styled.div`
    margin: 32px 0;

    .container {
        width: 90%;
        margin: 0 auto;
        color: white;

        h2 {
            margin-bottom: 16px;
            font-size: 1.75rem;
            font-weight: 700;
            text-align: center;
        }

        .question {
            margin-bottom: 4px;
            font-size: 1rem;
            font-weight: 600;
        }

        .answer {
            margin-bottom: 16px;
            font-size: 1rem;
            font-weight: 400;

            a {
                color: white;
            }
        }
    }
`;

export default FAQContainer;