import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFlaggedPosts, fetchFlaggedComments } from '../../store/actions';
import FlaggedPostContent from './FlaggedPostContent';
import FlaggedCommentContent from './FlaggedCommentContent';
import { Layout, Tabs } from 'antd';

const ModContent = (props) => {
  const { Header, Content } = Layout;
  const { TabPane } = Tabs;

  useEffect(() => {
    props.fetchFlaggedPosts();
  }, []);

  const handleModTabs = (key) => {
    if (key === 'Posts') {
      props.fetchFlaggedPosts();
    } else {
      props.fetchFlaggedComments();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: '0px 0px',
          background: '#f0f2f5',
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
          <h2>Moderator Settings</h2>
        </div>
      </Header>
      <Content>
        <Tabs onChange={handleModTabs}>
          <TabPane key="Posts" tab="Posts">
            <div
              style={{
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'flex-start',
              }}
            >
              {props.user.role_id > 1 &&
                props.posts.map((item) => {
                  return <FlaggedPostContent key={item.post_id} post={item} />;
                })}
            </div>
          </TabPane>
          <TabPane key="Comments" tab="Comments">
            <div
              style={{
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'flex-start',
                marginTop: '20px',
              }}
            >
              {props.user.role_id > 1 &&
                props.comments.map((item) => {
                  return (
                    <FlaggedCommentContent
                      key={item.comment_id}
                      comment={item}
                    />
                  );
                })}
            </div>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.flaggedPosts,
    comments: state.flaggedComments,
  };
};

export default connect(mapStateToProps, {
  fetchFlaggedPosts,
  fetchFlaggedComments,
})(ModContent);
