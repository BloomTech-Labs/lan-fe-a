import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
} from '../store/actions';
import { Layout } from 'antd';

import DiscussionCard from './DiscussionCard';

const RoomContent = (props) => {
  const { roomID } = useParams();
  const { Header, Content } = Layout;

  useEffect(() => {
    if (roomID) {
      props.fetchPostsAndFlagsByRoom(roomID, 1);
    }
  }, []);

  const findRoom = (_id) => {
    const currentRoom = props.rooms.filter((r) => r.id === parseInt(_id))[0];
    if (currentRoom) {
      return currentRoom;
    } else {
      return {
        room_name: 'ROOM NOT FOUND',
        description: '',
      };
    }
  };

  return (
    <>
      <Layout>
        <Header
          style={{
            padding: '0px 0px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'flex-start',
            height: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexFlow: 'column wrap',
              alignSelf: 'flex-start',
            }}
          >
            <h2>{findRoom(roomID).room_name}</h2>
            <p>{findRoom(roomID).description}</p>
          </div>
        </Header>
        <Content style={{ background: '#fff' }}>
          {props.discussions &&
            props.discussions.map((d) => (
              <DiscussionCard key={d.id} discussion={d} />
            ))}
        </Content>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
})(RoomContent);
