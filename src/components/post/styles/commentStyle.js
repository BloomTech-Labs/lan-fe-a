import styled from 'styled-components';

const CommentContainer = styled.div`
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
        width: 95%;
        padding-bottom: 1.5%;
        border-bottom: 1.5px solid grey;
        display:flex;
        flex-direction: column;
        .user {
            margin-bottom: 4px;
            display: flex;
            flex-wrap:wrap;
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
            .more-options {
                color: #ffffff;
                border: 1px solid white;
                height: 3vh;
                padding: 5px;
                display: flex;
                border-radius: 50px;
                margin-left: 83%;
                :hover {
                        opacity: 0.5;
                    }
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
            font-weight: 600;
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

            .fas {
                color: #0099ff;
            }
        }
    }
`;

export default CommentContainer;