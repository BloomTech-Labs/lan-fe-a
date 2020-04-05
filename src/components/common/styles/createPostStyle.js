import styled from 'styled-components';

const CreatePostContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 32px;
    margin-bottom: 32px;

    h2 {
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: 1px solid #2c2f33;
        font-size: 1.25rem;
        font-weight: 700;
        color: #ffffff;
    }

    form {
        display: flex;
        flex-direction: column;

        .category {
            margin-bottom: 4px;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        .categories {
            button {
                padding: 8px 16px;
                margin-right: 8px;
                border: 1px solid #1da1f2;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.25s;
                outline: none;
            }

            button:nth-child(1) {
                background: ${props => props.categories[0].value ? '#1da1f2' : 'none'};
                color: ${props => props.categories[0].value ? '#ffffff' : '#1da1f2'};
    
                :hover {
                    background-color: #1da1f2;
                    color: #ffffff;
                }
            }

            button:nth-child(2) {
                background: ${props => props.categories[1].value ? '#1da1f2' : 'none'};
                color: ${props => props.categories[1].value ? '#ffffff' : '#1da1f2'};
    
                :hover {
                    background-color: #1da1f2;
                    color: #ffffff;
                }
            }
        }

        .error {
            margin-top: 4px;
            font-size: 0.875rem;
            font-weight: 500;
            color: #ea4335;
        }

        label {
            margin: 16px 0 4px;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        input {
            padding: 10px;
            background-color: #2c2f33;
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

        textarea {
            min-height: 44px;
            min-width: 100%;
            max-width: 100%;
            height: 288px;
            padding: 10px;
            background-color: #2c2f33;
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

        .buttons {
            margin-top: 32px;
            display: flex;
            justify-content: flex-end;

            button {
                padding: 10px 32px;
                margin-left: 8px;
                background-color: #1da1f2;
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 1rem;
                font-weight: 500;
                color: #ffffff;
                cursor: pointer;
                transition: 0.25s;
    
                i {
                    margin-right: 4px;
                    font-size: 0.875rem;
                }
    
                :hover {
                    opacity: 0.5;
                }
            }

            button:last-of-type {
                i {
                    margin-right: 0px;
                    margin-left: 4px;
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

export default CreatePostContainer;