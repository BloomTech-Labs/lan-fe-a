import styled from 'styled-components';

const OnboardingContainer = styled.div`
    height: 100vh;
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
        line-height: 36px;
    }
    
    .instructions {
        margin-bottom: 16px;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
    }

    .tracks {
        .track {
            margin-right: 8px;
            margin-bottom: 8px;
            padding: 10px 32px;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: 0.25s;
            outline: none;
        }

        .track:nth-child(1) {
            background: ${props => props.tracks[0].value ? '#ea4335' : 'none'};
            border: 1px solid #ea4335;
            color: ${props => props.tracks[0].value ? '#ffffff' : '#ea4335'};

            :hover {
                background-color: #ea4335;
                color: #ffffff;
            }
        }

        .track:nth-child(2) {
            background: ${props => props.tracks[1].value ? '#ff9900' : 'none'};
            border: 1px solid #ff9900;
            color: ${props => props.tracks[1].value ? '#23272a' : '#ff9900'};

            :hover {
                background-color: #ff9900;
                color: #23272a;
            }
        }

        .track:nth-child(3) {
            background: ${props => props.tracks[2].value ? '#fbbc05' : 'none'};
            border: 1px solid #fbbc05;
            color: ${props => props.tracks[2].value ? '#23272a' : '#fbbc05'};

            :hover {
                background-color: #fbbc05;
                color: #23272a;
            }
        }

        .track:nth-child(4) {
            background: ${props => props.tracks[3].value ? '#34a853' : 'none'};
            border: 1px solid #34a853;
            color: ${props => props.tracks[3].value ? '#ffffff' : '#34a853'};

            :hover {
                background-color: #34a853;
                color: #ffffff;
            }
        }

        .track:nth-child(5) {
            background: ${props => props.tracks[4].value ? '#1da1f2' : 'none'};
            border: 1px solid #1da1f2;
            color: ${props => props.tracks[4].value ? '#ffffff' : '#1da1f2'};

            :hover {
                background-color: #1da1f2;
                color: #ffffff;
            }
        }

        .track:nth-child(6) {
            background: ${props => props.tracks[5].value ? '#ffffff' : 'none'};
            border: 1px solid #ffffff;
            color: ${props => props.tracks[5].value ? '#23272a' : '#ffffff'};

            :hover {
                background-color: #ffffff;
                color: #23272a;
            }
        }
    }

    .career-coach {
        margin-bottom: 32px;
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        display: inline;
        cursor: pointer;

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

    .continue {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .error {
            font-size: 0.875rem;
            font-weight: 500;
            color: #ea4335;
        }

        button {
            margin-left: 16px;
            padding: 10px 32px;
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
                margin-left: 4px;
                font-size: 0.75rem;
            }

            :hover {
                opacity: 0.5;
            }
        }
    }

    @media (min-width: 375px) {
        height: 90vh;
    }

    @media (min-width: 768px) {
        width: 691.2px;
    }
`;

export default OnboardingContainer;