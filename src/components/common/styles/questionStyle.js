import styled from 'styled-components';

const QuestionContainer = styled.div`
    a {
        text-decoration: none;
    }

    .question-card {
        padding: 16px;
        margin-bottom: 16px;
        background-color: #2c2f33;
        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        display: flex;

        .left {
            img {
                margin-right: 12px;
                height: 32px;
                width: 32px;
                border-radius: 50%;
                transition: 0.25s;

                :hover {
                    opacity: 0.5;
                }
            }
        }

        .right {
            .display-name {
                margin-bottom: 4px;
                font-size: 0.875rem;
                font-weight: 500;
                color: #ffffff;
                transition: 0.25s;

                :hover {
                    opacity: 0.5;
                }
            }

            .labels {
                margin-bottom: 4px;
                display: flex;

                button {
                    padding: 1px 2px;
                    margin-right: 4px;
                    background-color: #1da1f2;
                    border: none;
                    border-radius: 3px;
                    font-family: 'Nunito', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #ffffff;
                    cursor: pointer;
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
                align-items: center;

                p {
                    margin-right: 16px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #ffffff;

                    i {
                        margin-right: 4px;
                        transition: 2s;
                    }

                    .fa-thumbs-up:active {
                        transform: scale(1.25);
                    }
                }
            }
        }
    }
`;

export default QuestionContainer;