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
        font-weight: 550;
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
                padding: 10px 24px;
                margin-right: 8px;
                border: 1px solid #0099ff;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.25s;
                outline: none;
            }

            button:nth-child(1) {
                background: ${props => props.category === 'Behavioral' ? '#0099ff' : 'none'};
                color: ${props => props.category === 'Behavioral' ? '#ffffff' : '#0099ff'};
    
                :hover {
                    background-color: #0099ff;
                    color: #ffffff;
                }

                :active {
                    opacity: 0.5;
                }
            }

            button:nth-child(2) {
                background: ${props => props.category === 'Technical' ? '#0099ff' : 'none'};
                color: ${props => props.category === 'Technical' ? '#ffffff' : '#0099ff'};
    
                :hover {
                    background-color: #0099ff;
                    color: #ffffff;
                }

                :active {
                    opacity: 0.5;
                }
            }
        }

        .error {
            margin-top: 4px;
            font-size: 0.875rem;
            font-weight: 600;
            color: #ea4335;
        }

        label {
            margin: 16px 0 4px;
            font-size: 1.1rem;
            font-weight: 500;
            color: #ffffff;
        }

        input {
            padding: 10px;
            background-color: #212121;
            border: none;
            border-radius: 5px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
            margin-top: 2%;
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
            /* background-color: #2c2f33; */
            background-color: #212121;
            border: none;
            border-radius: 5px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
            margin-top: 2%;
            ::placeholder {
                color: dimgray;
            }
        }

        .buttons {
            margin-top: 32px;
            display: flex;
            justify-content: flex-end;

            button {
                padding: 10px 24px;
                margin-left: 8px;
                /* background: linear-gradient(to right, #0084ff, #0099ff); */
                background: linear-gradient(to right, #000000, #212121, #424949);
                border-radius: 5px;
                border: 2px solid  #424949;
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