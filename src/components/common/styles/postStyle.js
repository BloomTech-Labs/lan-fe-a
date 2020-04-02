import styled from 'styled-components';

const PostContainer = styled.div`
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

        .checkboxes {
            button {
                padding: 8px 16px;
                margin-right: 8px;
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: 0.25s;
                outline: none;
            }

            button:nth-child(1) {
                background: ${props => props.categories[0].value ? '#7b16ff' : 'none'};
                border: 1px solid #7b16ff;
                color: ${props => props.categories[0].value ? '#ffffff' : '#7b16ff'};
    
                :hover {
                    background-color: #7b16ff;
                    color: #ffffff;
                }
            }

            button:nth-child(2) {
                background: ${props => props.categories[1].value ? '#ea0b8c' : 'none'};
                border: 1px solid #ea0b8c;
                color: ${props => props.categories[1].value ? '#ffffff' : '#ea0b8c'};
    
                :hover {
                    background-color: #ea0b8c;
                    color: #ffffff;
                }
            }
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
            margin-bottom: 24px;
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
            display: flex;
            justify-content: flex-end;

            button {
                padding: 10px 32px;
                margin-left: 12px;
                background: linear-gradient(to right, #0072ff, #00c6ff);
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
                    font-size: 0.75rem;
                }
    
                :hover {
                    opacity: 0.5;
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