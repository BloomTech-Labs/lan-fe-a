import styled from 'styled-components';

const QuestionsContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-bottom: 64px;

    .no-posts-found {
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

    .youve-reached-the-end {
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
    }

    @media (min-width: 768px) {
        width: 95%;
    }

    @media (min-width: 1024px) {
        width: 972.8px;
    }
`;

export default QuestionsContainer;