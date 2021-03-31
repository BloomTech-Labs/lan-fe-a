import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPostsAndFlagsByRoom,
} from '../store/actions';
import { Layout, Drawer } from 'antd';

import DiscussionCard from './DiscussionCard';

const Room = (props) => {
  const { id } = useParams();
  const { path, url } = useRouteMatch();
  const { Header, Content } = Layout;

  useEffect(() => {
    if (id) {
      props.fetchPostsAndFlagsByRoom(id, 1);
      // props.fetchRooms();
    }
  }, []);

  console.log('discussions', props.discussions);

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
    <>
      <Drawer
        width="65vw"
        closable={false}
        visible={props.visible}
        onClose={handleClose}
      >
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
            {props.discussions &&
              props.discussions.map((d) => (
                <DiscussionCard
                  key={d.id}
                  discussion={d}
                  onClick={() =>
                    window.history.pushState(
                      {},
                      null,
                      `${url}/discussion/${d.id}`
                    )
                  }
                />
              ))}
          </Content>
        </Layout>
      </Drawer>

      <Switch>
        <Route path={`${path}/discussion/:id`}>
          <p>Discussion page</p>
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
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
  fetchPostsAndFlagsByRoom,
})(Room);
