import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Avatar, Input, Button } from 'antd';

import { fetchMessages, fetchUserProfile, sendMessage } from '../../store/actions';

const Message = (props) => {
  const { user_send_id, user_receive_id } = useParams();

  const [chatMessage, setChatMessage] = useState('');

  const handleInputChange = (e) => {
    setChatMessage(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    props.sendMessage(user_send_id, user_receive_id, chatMessage).then(() => {
      props.fetchMessages(user_send_id, user_receive_id);
    });
    setChatMessage('');
  };

  useEffect(() => {
    props.fetchUserProfile(user_receive_id);
    props.fetchMessages(user_send_id, user_receive_id);
  }, []);

  useEffect(() => {
    const checkHandler = setInterval(
      () => props.fetchMessages(user_send_id, user_receive_id),
      1000
    );

    return () => {
      clearInterval(checkHandler);
    };
  }, []);

  return (
    <div>
      <h2>Message Center</h2>
      <div style={{ display: 'flex' }}>
        <Input value={chatMessage} onChange={handleInputChange} />
        <Button type="primary" onClick={handleInputSubmit}>
          Submit
        </Button>
      </div>
      <div
        style={{ display: 'flex', flexFlow: 'column wrap', marginTop: '30px' }}
      >
        {props.messages.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                alignSelf:
                  item.user_send_id === props.user.id
                    ? 'flex-start'
                    : 'flex-end',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent:
                    item.user_send_id === props.user.id
                      ? 'flex-start'
                      : 'flex-end',
                }}
              >
                <Avatar
                  size="large"
                  src={
                    item.user_send_id === props.user.id
                      ? props.user.profilePicture
                      : props.currentUser.profile_picture
                  }
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '10px',
                  }}
                >
                  <span>
                    {item.user_send_id === props.user.id
                      ? props.user.displayName
                      : props.currentUser.display_name}
                  </span>
                  <span>{moment(item.created_at).fromNow()}</span>
                </div>
              </div>

              <Card
                key={item.id}
                style={{
                  alignSelf:
                    item.user_send_id === props.user.id
                      ? 'flex-start'
                      : 'flex-end',

                  backgroundColor:
                    item.user_send_id === props.user.id
                      ? 'lightgreen'
                      : 'lightblue',

                  width: 'auto',
                }}
              >
                {item.message}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentUser: state.currentUser,
    messages: state.messages,
  };
};

export default connect(mapStateToProps, {
  fetchMessages,
  sendMessage,
  fetchUserProfile,
})(Message);
