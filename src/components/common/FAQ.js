import React from 'react';
import Header from './Header';
import FAQContainer from './styles/faqStyle';

const FAQ = props => {
  return (
    <>
      <Header history={props.history} />
      <FAQContainer>
        <h2>Frequently Asked Questions</h2>
        <p className='question'>What is Lambda Alumni Network?</p>
        <p className='answer'>Lambda Alumni Network is a platform that allows Lambda School students to post, view, and learn  through a community geared toward growth.</p>
        <p className='question'>Why Lambda Alumni Network?</p>
        <p className='answer'>I felt there wasn't a platform who's sole purpose was for Alumni to continue to grow and communicate. Often it was tacked on to slack and not really given much focus.</p>
        <p className='question'>Is it easy to get started with Lambda Alumni Network?</p>
        <p className='answer'>Extremely easy. You can register in seconds and immediately start viewing, responding, and posting in the community.</p>
        <p className='question'>Who built Lambda Alumni Network?</p>
        <p className='answer'><a href='https://github.com/miugel' target='_blank' rel='noopener noreferrer'>Miguel was the creator of Lambda Alumni Network</a> and it is not supported by Lambda Students through the labs program</p>
        <p className='question'>What tech stack are you using?</p>
        <p className='answer'>React and styled-components on the front end and Express and Postgres on the back end.</p>
        <p className='question'>How can I get involved?</p>
        <p className='answer'>You can fork the repository, make changes, and submit a pull request. If the changes are satisfactory, we will merge!</p>
      </FAQContainer>
    </>
  );
};

export default FAQ;
