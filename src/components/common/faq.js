import React from 'react';
import FAQContainer from './styles/faqStyle';

const FAQ = () => {
    return (
        <FAQContainer>
            <div className='container'>
                <h2>FAQ</h2>
                <p className='question'>What is iq?</p>
                <p className='answer'>IQ is a platform that allows Lambda School students to answer, view, and post job interview questions to prepare for the real thing.</p>
                <p className='question'>Why iq?</p>
                <p className='answer'>I felt there wasn't a platform who's sole purpose was about interview questions. Often it was tacked on to job and interview preparation sites and not really given much focus.</p>
                <p className='question'>When will you be releasing?</p>
                <p className='answer'>If not this week, then the next.</p>
                <p className='question'>Is it easy to get started with iq?</p>
                <p className='answer'>Extremely easy. You can sign up in seconds and subsequently start answering, viewing, and posting questions.</p>
                <p className='question'>Who built iq?</p>
                <p className='answer'><a href='https://github.com/miugel' target='_blank' rel='noopener noreferrer'>Miguel</a> :)</p>
                <p className='question'>What tech stack are you using?</p>
                <p className='answer'>React and styled-components on the front end and Express and Postgres on the back end.</p>
                <p className='question'>How can I get involved?</p>
                <p className='answer'>I will be creating issues for things that need to be done. You can fork the repository, make changes, and submit a pull request. If the changes are satisfactory, I will merge!</p>
            </div>
        </FAQContainer>
    );
};

export default FAQ;