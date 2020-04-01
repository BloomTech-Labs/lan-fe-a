import styled from 'styled-components';

const FilterContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column-reverse;

    .filters {
        display: flex;
        align-items: center;

        .filter {
            margin-right: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            color: #ffffff;
        }
    
        select {
            margin-right: 24px;
            background-color: #23272a;
            border: none;
            font-family: 'Nunito', sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            color: #ffffff;
            outline: none;
        }

        .tracks {
            display: flex;
            overflow: auto;

            .track {
                padding: 2px 4px;
                margin-right: 8px;
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.25s;
                outline: none;
            }

            .track:nth-child(1) {
                background: ${props => props.tracks[0].value ? '#ffffff' : 'none'};
                border: 1px solid #ffffff;
                color: ${props => props.tracks[0].value ? '#23272a' : '#ffffff'};
    
                :hover {
                    background-color: #ffffff;
                    color: #23272a;
                }
            }

            .track:nth-child(2) {
                background: ${props => props.tracks[1].value ? '#ea4335' : 'none'};
                border: 1px solid #ea4335;
                color: ${props => props.tracks[1].value ? '#ffffff' : '#ea4335'};
    
                :hover {
                    background-color: #ea4335;
                    color: #ffffff;
                }
            }
    
            .track:nth-child(3) {
                background: ${props => props.tracks[2].value ? '#ff9900' : 'none'};
                border: 1px solid #ff9900;
                color: ${props => props.tracks[2].value ? '#23272a' : '#ff9900'};
    
                :hover {
                    background-color: #ff9900;
                    color: #23272a;
                }
            }
    
            .track:nth-child(4) {
                background: ${props => props.tracks[3].value ? '#fbbc05' : 'none'};
                border: 1px solid #fbbc05;
                color: ${props => props.tracks[3].value ? '#23272a' : '#fbbc05'};
    
                :hover {
                    background-color: #fbbc05;
                    color: #23272a;
                }
            }
    
            .track:nth-child(5) {
                background: ${props => props.tracks[4].value ? '#34a853' : 'none'};
                border: 1px solid #34a853;
                color: ${props => props.tracks[4].value ? '#ffffff' : '#34a853'};
    
                :hover {
                    background-color: #34a853;
                    color: #ffffff;
                }
            }
    
            .track:nth-child(6) {
                background: ${props => props.tracks[5].value ? '#1da1f2' : 'none'};
                border: 1px solid #1da1f2;
                color: ${props => props.tracks[5].value ? '#ffffff' : '#1da1f2'};
    
                :hover {
                    background-color: #1da1f2;
                    color: #ffffff;
                }
            }
        }
    }

    .post-a-question {
        padding: 10px;
        margin-bottom: 12px;
        background: linear-gradient(to right, #0072ff, #00c6ff);
        border: none;
        border-radius: 3px;
        font-family: 'Nunito', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ffffff;
        transition: 0.25s;
        cursor: pointer;

        i {
            margin-right: 4px;
            font-size: 0.75rem; 
        }

        :hover {
            opacity: 0.5;
        }
    }

    @media (min-width: 768px) {
        width: 95%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .post-a-question {
            margin-bottom: 0;
        }
    }

    @media (min-width: 1024px) {
        width: 972.8px;
    }
`;

export default FilterContainer;