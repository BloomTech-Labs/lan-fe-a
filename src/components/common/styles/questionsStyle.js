import styled from 'styled-components';

const QuestionsContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    .no-posts-found {
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
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
    
    .question-card {
        padding: 16px;
        margin-bottom: 16px;
        background-color: #2c2f33;
        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        display: flex;

        .left {
            margin-right: 8px;

            img {
                height: 32px;
                width: 32px;
                border-radius: 50%;
            }
        }

        .right {
            .display-name {
                margin-bottom: 4px;
                font-size: 0.875rem;
                font-weight: 500;
                color: #ffffff;
            }

            .tags {
                margin-bottom: 4px;
                display: flex;

                button {
                    padding: 2px 4px;
                    margin-right: 8px;
                    background-color: #ea4335;
                    border: none;
                    border-radius: 3px;
                    font-family: 'Nunito', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #ffffff;
                }
            }

            .question {
                margin-bottom: 4px;
                font-size: 1rem;
                font-weight: 600;
                color: #ffffff;
            }

            .answer {
                margin-bottom: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                color: #ffffff;
            }

            .activity {
                display: flex;

                p {
                    margin-right: 16px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #ffffff;

                    i {
                        margin-right: 4px;
                        transition: 0.1s;
                    }

                    .fa-thumbs-up:active {
                        transform: scale(1.25);
                    }
                }
            }
        }
        cursor: pointer;
        transition: 0.25s;

        :hover {
            opacity: 0.5;
        }
    }

    @media (min-width: 768px) {
        width: 95%;
    }

    @media (min-width: 1024px) {
        width: 972.8px;
    }
`;

export default QuestionsContainer;