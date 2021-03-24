import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchRecent,
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
} from '../store/actions';
import { Layout, Drawer } from 'antd';

import Post from './Post';

const Room = (props) => {
  const { id } = useParams();
  const { Header, Content } = Layout;

  useEffect(() => {
    if (id) {
      props.fetchPostByRoom(id, 1);
      props.fetchRooms();
    }
  }, []);

  const findRoom = (id) => {
    const currentRoom = props.rooms.filter((r) => r.id === parseInt(id))[0];
    if (currentRoom) {
      return currentRoom;
    } else {
      return {
        room_name: 'ROOM NOT FOUND',
        description: '',
      };
    }
  };

  const handleClose = () => {
    window.history.pushState({}, null, '/sample');
    props.setDrawerVisibility(false);
  };

  return (
    <Drawer width="65vw" closable={false} visible={props.visible} onClose={handleClose}>
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
            <h2>{findRoom(id).room_name}</h2>
            <p>{findRoom(id).description}</p>
          </div>
        </Header>
        <Content style={{background: '#fff'}}>
          {props.posts.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </Content>
      </Layout>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
})(Room);
