import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions';
import moment from 'moment';
import Header from '../common/header';
import Loader from '../common/loader';
import UserContainer from './styles/userStyle';

const User = props => {
    const userID = Number(props.match.params.id);

    const [tab, setTab] = useState('Posts');

    useEffect(() => props.fetchUserProfile(userID), []);

    return (
        <>
            <Header history={props.history} />

            {Object.keys(props.currentUser).length > 0 ? (
                <UserContainer tab={tab}>
                    <div className='user'>
                        <img src={props.currentUser.profile_picture} alt='profile picture' />

                        <div className='information'>
                            <div className='left-section'>
                                <div className='display-name-and-track'>
                                    <p className='display-name'>{props.currentUser.display_name}</p>
                                    <p className='track'>{props.currentUser.track.toUpperCase()}</p>
                                </div>
                                
                                <div className='statistics'>
                                    <p><b>{props.currentUser.posts.length}</b> posts</p>
                                    <p><b>{props.currentUser.comments.length}</b> comments</p>
                                </div>
                            </div>

                            {props.user.id === userID && <button>Edit profile</button>}
                        </div>
                    </div>

                    <div className='tabs'>
                        <p onClick={() => setTab('Posts')}>Posts</p>
                        <p onClick={() => setTab('Comments')}>Comments</p>
                        {/* {props.user.id === userID && <p onClick={() => setTab('Saved')}>Saved</p>} */}
                    </div>

                    {tab === 'Posts' ? (
                        props.currentUser.posts.map((item, index) => (
                            <div key={index} className='card' onClick={() => props.history.push(`/post/${item.id}`)}>
                                <p className='timestamp'>{moment(item.created_at).fromNow()}</p>
                                <p className='content'>{item.question}</p>
                            </div>
                        ))
                    ) : (
                        props.currentUser.comments.map((item, index) => (
                            <div key={index} className='card' onClick={() => props.history.push(`/post/${item.post_id}`)}>
                                <p className='timestamp'>{moment(item.created_at).fromNow()}</p>
                                <p className='content'>{item.comment}</p>
                            </div>
                        ))
                    )}
                </UserContainer>
            ) : (
                <Loader message={false} />
            )}
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, { fetchUserProfile })(User);