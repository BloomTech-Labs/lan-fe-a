import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, useParams, useRouteMatch } from 'react-router-dom';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
} from '../store/actions';
import { Layout, Drawer, Typography } from 'antd';

import DiscussionCard from './DiscussionCard';

const DiscussionDrawer = (props) => {
  const { discussionID } = useParams();
  const { path, url } = useRouteMatch();
  const { Header, Content } = Layout;

  useEffect(() => {
    if (discussionID) {
      props.setDrawerVisibility(true);
      props.fetchPost(discussionID);
    }
  }, []);

  return (
    <Drawer
      visible={props.visible}
      width="65%"
      onClose={() => {
        history.back();
        props.setDrawerVisibility(false);
      }}
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
        ></Header>
        <Content style={{ background: '#fff' }}>
          <div
            style={{
              display: 'flex',
              flexFlow: 'column wrap',
              alignSelf: 'flex-start',
            }}
          >
            <Typography.Title level={3}>
              {props.currentPost.title}
            </Typography.Title>
            <Typography.Text>{props.currentPost.description}</Typography.Text>
          </div>
        </Content>
      </Layout>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
    currentPost: state.currentPost,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
})(DiscussionDrawer);
