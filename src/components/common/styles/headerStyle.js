import styled from 'styled-components';

const HeaderContainer = styled.div`
    .container {
        height: 72px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 2rem;
            font-weight: 700;
            color: #ffffff;
            cursor: pointer;
        }

        i {
            font-size: 1.25rem;
            color: #ffffff;
            cursor: pointer;
        }
    }

    .hamburger-menu {
        width: 90%;
        margin: 0 auto;
        color: #ffffff;
        display: flex;
        flex-direction: column;

        a {
            padding: 12px 0;
            border-top: 1px solid #2c2f33;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        a:last-child {
            border-bottom: 1px solid #2c2f33;
        }
    }
`;

export default HeaderContainer;