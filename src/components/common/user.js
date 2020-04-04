import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import Header from './header';
import UserContainer from './styles/userStyle';

const User = props => {
    useEffect(() => props.fetchUser(), []);

    return (
        <>
            <Header history={props.history} />
            <UserContainer>
                <div className='user'>
                    <img src={props.user.profilePicture} alt='profile picture' />
                    <div className='information'>
                        <div className='left-section'>
                            <div className='display-name-and-track'>
                                <p className='display-name'>{props.user.displayName}</p>
                                <p className='track'>{props.user.track}</p>
                            </div>
                            <div className='statistics'>
                                <p><b>20</b>likes</p>
                                <p><b>20</b>posts</p>
                                <p><b>20</b>comments</p>
                            </div>
                        </div>
                        <button>Edit profile</button>
                    </div>
                </div>

                <div className='activity'>
                    <div className='tabs'>
                        <p>Posts</p>
                        <p>Comments</p>
                        <p>Saved</p>
                    </div>
                </div>
            </UserContainer>   
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { fetchUser })(User);