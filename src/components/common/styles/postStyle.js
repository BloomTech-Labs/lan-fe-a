import styled from 'styled-components';

const PostContainer = styled.div`
    width: 90%;
    padding: 24px 24px 0;
    margin: 0 auto;
    margin-top: 32px;
    margin-bottom: 64px;
    background-color: #2c2f33;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;

    .post {
        margin-bottom: 64px;
        display: flex;

        .left-section {
            img {
                margin-right: 16px;
                height: 32px;
                width: 32px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.25s;

                :hover {
                    opacity: 0.5;
                }
            }
        }

        .right-section {
            .user {
                margin-bottom: 4px;
                display: flex;
                align-items: center;

                .display-name {
                    margin-right: 8px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #ffffff;
                    cursor: pointer;
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
                align-items: center;

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
                    }
                }
            }
        }
    }

    form {
        margin-bottom: 64px;
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: 4px;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        textarea {
            min-height: 44px;
            min-width: 100%;
            max-width: 100%;
            height: 144px;
            padding: 10px;
            margin-bottom: 16px;
            background-color: #23272a;
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;

            ::placeholder {
                color: dimgray;
            }
        }

        .button {
            display: flex;
            justify-content: flex-end;

            button {
                padding: 8px 16px;
                background-color: #1da1f2;
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 0.875rem;
                font-weight: 500;
                color: #ffffff;
                cursor: pointer;
                transition: 0.25s;
    
                :hover {
                    opacity: 0.5;
                }
            }
        }
    }

    .comments {
        .filter {
            margin-bottom: 16px;
            display: flex;
            align-items: center;
    
            label {
                margin-right: 8px;
                font-size: 0.75rem;
                font-weight: 700;
                color: #ffffff;
            }
        
            select {
                margin-right: 16px;
                background-color: #2c2f33;
                border: none;
                font-family: 'Nunito', sans-serif;
                font-size: 0.875rem;
                font-weight: 500;
                color: #ffffff;
                cursor: pointer;
            }
        }

        .comment {
            margin-bottom: 32px;
            display: flex;

            img {
                margin-right: 12px;
                height: 32px;
                width: 32px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.25s;

                :hover {
                    opacity: 0.5;
                }
            }

            .right-section {
                .user {
                    margin-bottom: 4px;
                    display: flex;
                    align-items: center;
    
                    .display-name {
                        margin-right: 8px;
                        font-size: 0.875rem;
                        font-weight: 500;
                        color: #ffffff;
                        cursor: pointer;
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

                .answer {
                    margin-bottom: 8px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #ffffff;
                }

                .likes {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #ffffff;
                    display: flex;
                    align-items: center;

                    i {
                        margin-right: 4px;
                        cursor: pointer;
                        transition: 0.1s;

                        :active {
                            transform: scale(1.25);
                        }
                    }
                }
            }
        }
    }

    @media (min-width: 768px) {
        width: 95%;
    }

    @media (min-width: 1024px) {
        width: 972.8px;
    }
`;

export default PostContainer;