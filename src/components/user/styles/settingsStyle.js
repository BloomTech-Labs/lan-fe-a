import styled from 'styled-components';

const SettingsContainer = styled.div`
    width: 98%;
    margin: 5% auto;
    display: flex;
    flex-wrap: wrap;
    input{
        background-color: #242323;
        height: 40px;
        width: 35%;
        padding: 8px;
        margin: 3% 2% 2% 2.2%;
        border-radius: 8px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
        font-family: "Nunito", sans-serif;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        /* border: 1px solid lightgrey; */
        
        ::placeholder {
          color: dimgray;
        }
    }

    button {      
            padding: 8px 12px;
            background-color: #212529;
            box-shadow: 2px 2px 8px #212529;
            border: 1px solid #707B7C ;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.7rem;
            color: #ffffff;
            cursor: pointer;
            transition: 0.25s;
              :hover {
                opacity: 0.5;
              }
          }

    h2 {
        margin-bottom: 32px;
        font-size: 1.75rem;
        font-weight: 700;
        color: #ffffff;
        
    }

    h3 {
        width: 98%;
        padding: 2%;
        font-size: 1.6rem;
        font-weight: 500;
        color: #ffffff;
        border: 1px solid grey;
        border-left-style: hidden;
        border-right-style: hidden;
        border-bottom-style: hidden;
        /* width: 100%; */
        /* margin-left: 8%; */
        /* padding-bottom: 8px; */
        /* margin-bottom: 8px; */
        
    }
// styling users-setting-card
    .users-card-wrapper{
        display: flex;
        flex-wrap: wrap;
        width: 98%;
        padding: 3%;
        border-top-style: hidden;
        /* border: 1px solid grey; */
    }
   

    .display-name {
        display: flex; 
        border: none;
        margin-left: 4%;
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
        button{
            padding: 12px 26px;
            margin-top: 16px;
            background: linear-gradient(to right, #000000, #212121, #424949);
            font-family: "Nunito", sans-serif;
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
            cursor: pointer;
            transition: 0.25s;
            border: 1px solid grey;
            height: 50px;
            /* border-bottom-style: none; */
            /* /* box-shadow: 3px 3px 6px #888888; */
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