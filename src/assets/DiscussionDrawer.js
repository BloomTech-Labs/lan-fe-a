import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
} from '../store/actions';
import { Layout, Drawer } from 'antd';

import DiscussionCard from './DiscussionCard';

const Room = (props) => {
  const { id } = useParams();
  const { path, url } = useRouteMatch();
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

  return (
    <Drawer visible={props.visible}>
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
        <Content style={{ background: '#fff' }}>
          {props.discussions.map((d) => (
            <DiscussionCard
              key={d.id}
              discussion={d}
              onClick={() =>
                window.history.pushState({}, null, `${url}/discussion/${d.id}`)
              }
            />
          ))}
        </Content>
      </Layout>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
    console.log(state);
  return {
    discussions: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
})(Room);
