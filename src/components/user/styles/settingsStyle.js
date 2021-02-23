import styled from 'styled-components';

const SettingsContainer = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;
    h2 {
        margin-bottom: 32px;
        font-size: 1.75rem;
        font-weight: 700;
        color: #ffffff;
    }

    h3 {
        margin-left: 7%;
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: 1px solid #2c2f33;
        font-size: 1.7rem;
        font-weight: 700;
        color: #ffffff;
    }
// styling users-setting-card
    .users-card-wrapper{
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        margin-left:8%;
    }
   

    .display-name {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        margin-right: 45%;
        .left-section {
            p {
                font-size: 1rem;
                font-weight: 500;
                color: #ffffff;

                :first-child {
                    margin-bottom: 4px;
                    font-weight: 600;
                }
            }
        }
        button {
            padding: 12px 26px;
            margin-top: 16px;
            background: linear-gradient(to right, #000000, #212121, #424949);
            // background: white ;
            border-radius: 5px;
            font-family: "Nunito", sans-serif;
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
            cursor: pointer;
            transition: 0.25s;
            border: 1px solid grey;
            box-shadow: 3px 3px 6px #888888;
            :hover {
              opacity: 0.5;
            }
          }
    }

    .update {
        padding: 16px;
        margin-bottom: 16px;
        background-color: #2c2f33;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        label {
            margin-bottom: 4px;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        input {
            width: 256px;
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

        button {
            padding: 10px 24px;
            background: linear-gradient(to right, #0084ff, #0099ff);
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.875rem;
            color: #ffffff;
            cursor: pointer;
            transition: 0.25s;

            :hover {
                opacity: 0.5;
            }
        }
    }

    .track {
        margin-bottom: 32px;
        background: none;
        border: none;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        
        i {
            margin-left: 4px;
            font-size: 0.75rem;
            transition: 0.25s;
        }

        :hover {
            i {
                margin-left: 8px;
            }
        }
    }

    .deactivate {
        background: none;
        border: none;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        color: #db4437;
        cursor: pointer;
        transition: 0.25s;

        i {
            margin-right: 8px;
        }

        :hover {
            opacity: 0.5;
        }
    }

    .confirm {
        margin-top: 16px;

        p {
            margin-bottom: 16px;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        button {
            padding: 10px 24px;
            background: linear-gradient(to right, #0084ff, #0099ff);
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            color: #ffffff;
            transition: 0.25s;

            :first-of-type {
                margin-right: 8px;
                background: #2c2f33;
                color: dimgray;
            }

            :last-child {
                cursor: pointer;

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

export default SettingsContainer;