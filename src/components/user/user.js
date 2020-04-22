import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import Header from '../common/header';
import UserContainer from './styles/userStyle';

const User = props => {
    const userID = Number(props.match.params.id);

    const [tab, setTab] = useState('Posts');

    useEffect(() => props.fetchUser(), []);

    return (
        <>
            <Header history={props.history} />
            <UserContainer tab={tab}>
                <div className='user'>
                    <img src={props.user.profilePicture} alt='profile picture' />

                    <div className='information'>
                        <div className='left-section'>
                            <div className='display-name-and-track'>
                                <p className='display-name'>{props.user.displayName}</p>
                                <p className='track'>{props.user.track}</p>
                            </div>
                            
                            <div className='statistics'>
                                <p><b>20</b> posts</p>
                                <p><b>20</b> comments</p>
                            </div>
                        </div>

                        {props.user.id === userID && <button>Edit profile</button>}
                    </div>
                </div>

                <div className='activity'>
                    <div className='tabs'>
                        <p onClick={() => setTab('Posts')}>Posts</p>
                        <p onClick={() => setTab('Comments')}>Comments</p>
                        {props.user.id === userID && <p onClick={() => setTab('Saved')}>Saved</p>}
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