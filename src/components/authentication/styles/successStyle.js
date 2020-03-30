import styled from 'styled-components';

const SuccessContainer = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 32px;
        width: 32px;
        animation: loading-icon-spin infinite 1s linear;
    }

    @keyframes  loading-icon-spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
`;

export default SuccessContainer;