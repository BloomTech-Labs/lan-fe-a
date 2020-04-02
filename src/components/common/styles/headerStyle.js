import styled from 'styled-components';

const HeaderContainer = styled.div`
    height: 72px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.25s;

        img {
            margin-right: 16px;
            height: 24px;
            width: 24px;
        }

        h1 {
            margin-right: 16px;
            font-size: 1.75rem;
            font-weight: 700;
            color: #ffffff;
            display: none;
        }

        :hover {
            opacity: 0.5;
        }
    }

    form {
        max-width: 691.2px;
        width: 100%;
        display: flex;

        input {
            width: 100%;
            padding: 10px;
            background-color: #2c2f33;
            border: none;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 1rem;
            color: #ffffff;

            ::placeholder {
                color: dimgray;
            }
        }

        button {
            padding: 10px;
            background-color: #2c2f33;
            border: none;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            cursor: pointer;

            i {
                font-size: 1rem;
                color: dimgray;
                transition: 0.25s;
            }

            :hover {
                i {
                    opacity: 0.5;
                }
            }
        }
    }

    .profile-picture {
        height: 32px;
        width: 32px;
        margin-left: 16px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.25s;

        :hover {
            opacity: 0.5;
        }
    }

    .dropdown {
        width: 200px;
        background: #2c2f33;
        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 5%;
        z-index: 9999;

        a {
            text-decoration: none;

            p {
                border-bottom: 1px solid #23272a;
            }
        }

        p {
            padding: 12px;
            font-size: 0.875rem;
            font-weight: 500;
            color: #ffffff;
            cursor: pointer;
            transition: 0.25s;

            i {
                margin-right: 8px;
                font-size: 0.875rem;
            }

            :hover {
                opacity: 0.5;
            }
        }
    }

    @media (min-width: 768px) {
        width: 95%;

        .logo {
            img {
                margin-right: 8px;
            }

            h1 {
                display: initial;
            }
        }

        .dropdown {
            right: 2.5%;
        }
    }
`;

export default HeaderContainer;