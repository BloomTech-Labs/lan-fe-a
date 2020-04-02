import styled from 'styled-components';

const DashboardContainer = styled.div`
    .loading {
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            margin-bottom: 8px;
            height: 32px;
            width: 32px;
            animation: loading-icon-spin infinite 1s linear;
        }

        p {
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        @keyframes  loading-icon-spin {
            from {
                transform: rotate(0deg);
            }
    
            to {
                transform: rotate(360deg);
            }
        }
    }
`;

export default DashboardContainer;