import styled from 'styled-components';

const CareerCoachContainer = styled.div`
    height: 90vh;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
        margin-bottom: 4px;
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
    }

    .instructions {
        margin-bottom: 16px;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
    }

    form {
        display: flex;
        flex-direction: column;
        
        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 4px;
            background-color: #2c2f33;
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            color: #ffffff;
        }

        .error {
            font-size: 0.875rem;
            font-weight: 600;
            color: #ea4335;
        }

        .buttons {
            margin-top: 28px;
            display: flex;
            justify-content: flex-end;
    
            button {
                padding: 10px 24px;
                background: linear-gradient(to right, #0084ff, #0099ff);
                border: none;
                border-radius: 3px;
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

            button:last-child {
                margin-left: 8px;
                
                i {
                    margin-right: 0;
                    margin-left: 4px;
                }
            }
        }
    }

    @media (min-width: 414px) {
        width: 372.6px;
    }
`;

export default CareerCoachContainer;