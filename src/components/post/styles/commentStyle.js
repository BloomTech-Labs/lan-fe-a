import styled from 'styled-components';

const CommentContainer = styled.div`
    margin-bottom: 52px;
    display: flex;
    padding: 2%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
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
        width: 90%;
        padding-bottom: 1.5%;
        border-bottom: 1.5px solid grey;
       
        .user {
            margin-bottom: 4px;
            display: flex;
            align-items: center;

            .display-name {
                margin-right: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                color: #ffffff;
                cursor: pointer;
                transition: 0.25s;
                text-transform: capitalize;
                font-size: 1.1rem;
				font-weight: 700;
                :hover {
                    opacity: 0.5;
                }
            }

            .timestamp {
                font-size: 0.8rem;
                font-weight: 500;
                color: #ffffff;
            }
        }

        .answer {            
            margin-bottom: 8px;
            font-size: 1rem;
            font-weight: 600;
            // color: #ffffff;
            color: #E0DCDC;            
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