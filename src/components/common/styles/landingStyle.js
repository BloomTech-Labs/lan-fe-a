import styled from 'styled-components';

const LandingContainer = styled.div`
    height: 90vh;
    width: 90%;
    margin: 0 auto;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .left-section-container {        
        .left-section {
            max-width: 372.6px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
           
            .logo-and-name {
                margin-bottom: 4px;
                display: flex;
                flex-direction: column;
                img {
                    width:50%;
                    height: 45%;
                    margin-right: 8px;
                    margin-bottom: 15px;
                }

                h1 {
                    font-size: 1.9rem;
                    font-weight: 550;
                    color: #EC3944;
                }
            }
            
            .description {
                font-size: 1.1rem;
                color: #ffffff;
            }
        }
    }

    .right-section-container {
        .right-section {
            max-width: 372.6px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
      
            h2 {
                margin-bottom: 16px;
                font-size: 1.75rem;
                font-weight: 600;
                color: #ffffff;
            }

            .social-media-link {
                text-decoration: none;

                :last-of-type {
                    button {
                        margin-bottom: 8px;
                    }
                }
            }
                
            button {
                width: 100%;
                padding: 10px 0;
                margin-bottom: 12px;
                background-color: white;
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 1rem;
                font-weight: 500;
                color: #333;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: 0.25s;

                img {
                    margin-right: 8px;
                    height: 24px;
                    width: 24px;
                }

                :hover {
                    opacity: 0.5;
                }
            }

            .terms {
                font-size: 1.1rem;
                color: #ffffff;

                a {
                    color: #ffffff;
                    transition: 0.25s;

                    :hover {
                        opacity: 0.5;
                    }
                }
            }

            .instead {
                font-size: 0.875rem;
                color: #ffffff;

                a {
                    color: #ffffff;
                    transition: 0.25s;

                    :hover {
                        opacity: 0.5;
                    }
                }
            }
        }
    }

    @media(min-width: 1024px) {
        width: 972.8px;
        flex-direction: row;

        .left-section-container {
            width: 50%;

            .left-section {
                height: 90vh;
            }
        }

        .right-section-container {
            width: 50%;

           .right-section {
                height: 90vh;
           }
        }
    }
`;

export default LandingContainer;
