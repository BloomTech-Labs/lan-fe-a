import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header';
import Filter from './filter';
import Questions from './questions';
import styled from 'styled-components';
import lambdaschool from '../../img/lambda-school.png';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.error('Lambda track not set. We recommend setting one now.');

const ModalContainer = styled.div`
    transition: 0.25s;

    img {
        height: 40px;
        margin-bottom: 8px;
    }

    h2 {
        font-weight: 700;
        margin-bottom: 16px;
    }

    p {
        font-weight: 600;
        margin-bottom: 8px;
    }

    .single-button-container {
        display: flex;
        justify-content: flex-end;
    }

    .double-button-container {
        display: flex;
        justify-content: space-between;
    }

    button {
        margin-top: 40px;
        padding: 10px 24px;
        background-color: #ec3944;
        border: none;
        border-radius: 3px;
        font-family: 'Nunito', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        transition: 0.25s;

        i {
            margin-right: 4px;
            font-size: 0.75rem;
        }

        :hover {
            opacity: 0.75;
        }
    }

    ul {
        font-weight: 600;
        padding: 0 0 16px 8px;
    }

    .text-align-center {
        text-align: center;
    }

    a {
        color: #ec3944;
    }
`;

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        backgroundColor: '#f2f2f2',
        color: '#333',
        // backgroundColor: '#333',
        // color: '#f2f2f2',
        padding: '96px 64px',
        maxWidth: '500px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

const Dashboard = props => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [slide, setSlide] = useState(1)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        // openModal();
        notify();
    }, []);

    const incrementSlide = () => setSlide(slide + 1);

    const decrementSlide = () => setSlide(slide - 1);
    
    // I don't know how I like the changing size of the modal - maybe we can cut down on the content or spread it out over more slides.
    // How do we go about showing this modal just once to every user? Table in database for just this purpose, like a notifications table?
    // Will need to extract modal into seperate modular component. That will also allow it to be opened from FAQ option in header dropdown.
    return (
        <>
            <Header history={props.history} />
            <Filter history={props.history} />
            <Questions history={props.history} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='FAQ'
                shouldCloseOnOverlayClick={false}
            >
                {slide === 1 &&
                    <ModalContainer>
                        <img src={lambdaschool} alt='Lambda School logo' />
                        <h2>Welcome to the Lambda Alumni Network (LAN)!</h2>
                        <p>LAN is a private community for Lambda alumni.</p>
                        <p>If you have graduated from Lambda School and you wish to engage with alums to help advance their careers and to advance your own, then this is probably the community for you.</p>
                        <div className='single-button-container'>
                            <button onClick={incrementSlide}>Next</button>
                        </div>
                    </ModalContainer>
                }
                {slide === 2 &&
                    <ModalContainer>
                        <h2>What is the purpose of this community platform?</h2>
                        <p>The core principle of this community platform is to give 🤲</p>
                        <p>We believe that “giving back” is the key to unlocking the potential of every Lambda student and alum. Here’s why:</p>
                        <ul>
                            <li>Take a look at the #hired channel on Slack. Each story is unique and moving for its own reason, but every story calls attention to the idea that “it takes a village.”</li>
                            <li>This community has already helped so many of us. That said, many of us know deep down that together, we have an incredible capacity to do so much more.</li>
                            <li>This community has the capacity to move mountains. We built this platform to better unleash that capacity.</li>
                        </ul>
                        <p className='text-align-center'><i>“Give, and you shall receive tenfold” - Austen Allred, probably.</i></p>
                        <div className='double-button-container'>
                            <button onClick={decrementSlide}>Previous</button>
                            <button onClick={incrementSlide}>Next</button>
                        </div>
                    </ModalContainer>
                }
                {slide === 3 &&
                    <ModalContainer>
                        <h2>Why this, and not Slack, Reddit, Discord, Circle, etc.?</h2>
                        <p>This is a great question 😊 Here are a few reasons why we decided not to use a third-party app:</p>
                        <ul>
                            <li>Slack—and a few other community platforms—are very synchronous, in nature. This means that if you don’t login or open the app for a few days, you might completely miss a conversation that could have had a huge impact on you, or your career.</li>
                            <li>Other community platforms have poor search capabilities. Search is important because fatigue is real, and nobody can hope to answer the same questions over and over again.</li>
                            <li>Lastly, we think that it is both good and important to build things 🛠</li>
                        </ul>
                        <div className='double-button-container'>
                            <button onClick={decrementSlide}>Previous</button>
                            <button onClick={incrementSlide}>Next</button>
                        </div>
                    </ModalContainer>
                }
                {slide === 4 &&
                    <ModalContainer>
                        <h2>How does it work?</h2>
                        <p>We want to keep this simple and clean 🧼 Here are a few ways to engage:</p>
                        <ul>
                            <li>Post a question—or share information and resources—using the button in the upper-right corner of the webpage.</li>
                            <li>Upvote a post that you find helpful, and it will move higher in the queue with the “Top Posts” filter applied.</li>
                            <li>Comment on posts to say thanks, to ask clarifying questions, or to engage in discussion.</li>
                        </ul>
                        <p>That’s basically it. We’re totally open to building new features. Just email <a href='mailto:alumni@lambdaschool.com'>alumni@lambdaschool.com</a> and we’ll get back to you.</p>
                        <div className='double-button-container'>
                            <button onClick={decrementSlide}>Previous</button>
                            <button onClick={incrementSlide}>Next</button>
                        </div>
                    </ModalContainer>
                }
                {slide === 5 &&
                    <ModalContainer>
                        <h2>Awesome! So how do I get started?</h2>
                        <p>Create your profile! ✨</p>
                        <p>Your profile is incredibly important. It is how other Lambda grads will identify you.</p>
                        <p>Please make sure to accurately identify your cohort, your company (if you have a job), your title, and how you prefer to be contacted.</p>
                        <p>There are now thousands of Lambda alumni, all around the world.  Keep in mind that some of them have been working for nearly three years, while some have just started looking for their first job in tech.</p>
                        <p>We want this place to work for everyone. Nobody’s path is linear. Keep your profile up-to-date, and it will make it much easier for everyone to feel connected.</p>
                        <p className='text-align-center'><i>Enjoy the LAN! Thank you for helping others.</i></p>
                        <div className='double-button-container'>
                            <button onClick={decrementSlide}>Previous</button>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </ModalContainer>
                }
            </Modal>

            <Toaster
                position='top-right'
                reverseOrder={false}
            />
        </>
    );
};

const mapStateToProps = state => {
    console.log('???????', state);
    return {
        chess: state.user
    };
};

export default connect(mapStateToProps)(Dashboard);