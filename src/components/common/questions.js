import React from 'react';
import { connect } from 'react-redux';
import QuestionsContainer from './styles/questionsStyle';

const Questions = props => {
    return (
        <QuestionsContainer>
            <div className='question-card'>
                <div className='left'>
                    <img src={props.user.profilePicture} alt='profile picture' />
                </div>
                <div className='right'>
                    <p className='display-name'>{props.user.displayName}</p>
                    <div className='tags'>
                        <button>{props.user.track}</button>
                        <button>Technical</button>
                    </div>
                    <p className='question'>What is your greatest strength?</p>
                    <p className='answer'>Hey, I made a pretty cool plugin for this (hopefully). It found 6,567 errors in one of my repos that were undiscovered using airbnb/jsx-a11y rules. Please give it a star so we can get more people interested, using it, and contributing to make a more accessible internet for all.</p>
                    <div className='activity'>
                        <p><i className='far fa-thumbs-up'></i>69</p>
                        <p><i className='far fa-comment'></i>69</p>
                    </div>
                </div>
            </div>

            <div className='question-card'>
                <div className='left'>
                    <img src={props.user.profilePicture} alt='profile picture' />
                </div>
                <div className='right'>
                    <p className='display-name'>{props.user.displayName}</p>
                    <div className='tags'>
                        <button>{props.user.track}</button>
                        <button>Technical</button>
                    </div>
                    <p className='question'>What is your greatest strength?</p>
                    <p className='answer'>Hey, I made a pretty cool plugin for this (hopefully). It found 6,567 errors in one of my repos that were undiscovered using airbnb/jsx-a11y rules. Please give it a star so we can get more people interested, using it, and contributing to make a more accessible internet for all.</p>
                    <div className='activity'>
                        <p><i className='far fa-thumbs-up'></i>69</p>
                        <p><i className='far fa-comment'></i>69</p>
                    </div>
                </div>
            </div>
        </QuestionsContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Questions);