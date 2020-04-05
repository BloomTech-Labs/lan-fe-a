import React from 'react';
import Header from './header';
import FAQContainer from './styles/faqStyle';

const FAQ = props => {
    return (
        <>
            <Header history={props.history} />
            <FAQContainer>
                <h2>Frequently Asked Questions</h2>
                <p className='question'>What is viewee?</p>
                <p className='answer'>viewee is a platform that allows Lambda School students to answer, view, and post job interview questions to prepare for the real thing.</p>
                <p className='question'>Why viewee?</p>
                <p className='answer'>I felt there wasn't a platform who's sole purpose was about interview questions. Often it was tacked on to job and interview preparation sites and not really given much focus.</p>
                <p className='question'>Is it easy to get started with viewee?</p>
                <p className='answer'>Extremely easy. You can register in seconds and immediately start viewing, answering, and posting questions.</p>
                <p className='question'>Who built viewee?</p>
                <p className='answer'><a href='https://github.com/miugel' target='_blank' rel='noopener noreferrer'>Miguel</a></p>
                <p className='question'>What tech stack are you using?</p>
                <p className='answer'>React and styled-components on the front end and Express and Postgres on the back end.</p>
                <p className='question'>How can I get involved?</p>
                <p className='answer'>You can fork the repository, make changes, and submit a pull request. If the changes are satisfactory, I will merge!</p>
            </FAQContainer>
        </>
    );
};

export default FAQ;