import styled from 'styled-components';

const PostContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 32px;
    margin-bottom: 32px;

    h2 {
        padding-bottom: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid #2c2f33;
        font-size: 1.25rem;
        font-weight: 700;
        color: #ffffff;
    }

    form {
        display: flex;
        flex-direction: column;

        label {
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        input {
            padding: 10px;
            margin-bottom: 12px;
            background-color: #2c2f33;
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        textarea {
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