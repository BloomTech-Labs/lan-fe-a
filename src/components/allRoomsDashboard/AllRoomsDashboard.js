import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import AllRoomsBody from './AllRoomsBody';
import redlambda from '../../img/redlambda.png';
import Modal from 'react-modal';
import { updateOnboardedStatusToTrue, fetchUser } from '../../store/actions';
import StyledModalContainer, { customStyles } from './styles/modalContainerStyle';

const AllRoomsDashboard = props => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(1);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    props.updateOnboardedStatusToTrue()
      .then(() => {
        props.fetchUser();
        setIsOpen(false);
      });
  };

  useEffect(() => {
    if(props.user.onboarded == false) {
      openModal();
    }
  }, [props.user]);

  const incrementSlide = () => setSlide(slide + 1);
  const decrementSlide = () => setSlide(slide - 1);
    
  return (
    <>
      <Header history={props.history} />
      <AllRoomsBody history={props.history} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel='FAQ'
        shouldCloseOnOverlayClick={false}
      >
        {slide === 1 &&
                    <StyledModalContainer>
                      <img src={redlambda} alt='Lambda School Red logo' />
                      <h2>Welcome to the Lambda Alumni Network (LAN)!</h2>
                      <p>LAN is a private community for Lambda alumni.</p>
                      <p>If you have graduated from Lambda School and you wish to engage with alums to help advance their careers and to advance your own, then this is probably the community for you.</p>
                      <div className='single-button-container'>
                        <button onClick={incrementSlide}>Next</button>
                      </div>
                    </StyledModalContainer>
        }
        {slide === 2 &&
                    <StyledModalContainer>
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
                    </StyledModalContainer>
        }
        {slide === 3 &&
                    <StyledModalContainer>
                      <h2>Why this, and not Slack, Reddit, Discord, Circle, etc.?</h2>
                      <p>This is a great question 😊 Here are a few reasons why we decided not to use a third-party app:</p>
                      <ul>
                        <li>Slack—and a few other community platforms—are very synchronous, in nature. This means that if you don’t login or open the app for a few days, you might completely miss a conversation that could have had a huge impact on you, or your career.</li>
                        <li>Other community platforms have poor search capabilities. Search is important because fatigue is real, and nobody can hope to provide the same material over and over again ad stay useful.</li>
                        <li>Lastly, we think that it is both good and important to build things 🛠</li>
                      </ul>
                      <div className='double-button-container'>
                        <button onClick={decrementSlide}>Previous</button>
                        <button onClick={incrementSlide}>Next</button>
                      </div>
                    </StyledModalContainer>
        }
        {slide === 4 &&
                    <StyledModalContainer>
                      <h2>How does it work?</h2>
                      <p>We want to keep this simple and clean 🧼 Here are a few ways to engage:</p>
                      <ul>
                        <li>Create a post in a relevent room or share information and resources related to a post in the comments.</li>
                        <li>Upvote a post that you find helpful, and it will move higher in the queue with the “Popular Posts” filter applied.</li>
                        <li>Comment on posts to say thanks, to ask clarifying questions, or to engage in discussion.</li>
                      </ul>
                      <p>That’s basically it. We’re totally open to building new features. Just email <a href='mailto:alumni@lambdaschool.com'>alumni@lambdaschool.com</a> and we’ll get back to you.</p>
                      <div className='double-button-container'>
                        <button onClick={decrementSlide}>Previous</button>
                        <button onClick={incrementSlide}>Next</button>
                      </div>
                    </StyledModalContainer>
        }
        {slide === 5 &&
                    <StyledModalContainer>
                      <h2>Awesome! So how do I get started?</h2>
                      <p>Create your profile! ✨</p>
                      <p>Your profile is incredibly important. It is how other Lambda grads will identify you.</p>
                      <p>Please make sure to accurately identify your cohort, your company (if you have a job), your title, and how you prefer to be contacted.</p>
                      <p>There are now thousands of Lambda alumni, all around the world.  Keep in mind that some of them have been working for nearly three years, while some have just started looking for their first job in tech.</p>
                      <p>We want this place to work for everyone. Nobody’s path is linear. Keep your profile up-to-date, and it will make it much easier for everyone to feel connected.</p>
                      <p className='text-align-center'><i>Enjoy the LAN! Thank you for helping others.</i></p>
                      <div className='double-button-container'>
                        <button onClick={decrementSlide}>Previous</button>
                        <button onClick={handleCloseModal}>Close</button>
                      </div>
                    </StyledModalContainer>
        }
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { updateOnboardedStatusToTrue, fetchUser })(AllRoomsDashboard);
