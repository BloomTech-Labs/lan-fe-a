import styled from 'styled-components';

const QuestionContainer = styled.div`
    a {
        text-decoration: none;
        color: #ffffff;
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
            .display-name-and-timestamp {
                margin-bottom: 4px;
                display: flex;
                align-items: center;

                .display-name {
                    margin-right: 8px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #ffffff;
                    transition: 0.25s;
    
                    :hover {
                        opacity: 0.5;
                    }
                }

                .timestamp {
                    font-size: 0.625rem;
                    font-weight: 500;
                    color: #ffffff;
                }
            }

            .labels {
                margin-bottom: 4px;
                display: flex;

                button {
                    padding: 1px 2px;
                    margin-right: 4px;
                    background: linear-gradient(to right, #0084ff, #0099ff);
                    border: none;
                    border-radius: 3px;
                    font-family: 'Nunito', sans-serif;
                    font-size: 0.625rem;
                    font-weight: 700;
                    color: #ffffff;
                    cursor: pointer;
                }

                .career-coach {
                    background: #ffcb37;
                    color: #23272a;
                }
            }

            .question {
                margin-bottom: 4px;
                font-size: 1rem;
                font-weight: 600;
                color: #ffffff;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
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
                        transition: 0.1s;
                    }

                    .fa-thumbs-up:active {
                        transform: scale(1.25);
                    }

                    .fas {
                        color: #0099ff;
                    }
                }
            }
        }
    }
`;

export default QuestionContainer;