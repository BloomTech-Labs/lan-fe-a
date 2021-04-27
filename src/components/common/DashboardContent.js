import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, List } from 'antd';
import DiscussionCard from '../posts/DiscussionCard';
import DiscussionDrawer from '../posts/DiscussionDrawer';
import { PrivateRoute } from '../../utils/privateRoute';
import { useRouteMatch } from 'react-router';

import {
  fetchRecent,
  fetchPostByRoom,
  fetchRooms,
  fetchPostForFeed,
} from '../../store/actions';

// import Feed from './Feed';

const DashboardContent = (props) => {
  const { path } = useRouteMatch();
  const { Header, Content } = Layout;

  useEffect(() => {
    props.fetchPostForFeed();
  }, []);
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
          <h2>Feed</h2>
        </div>
      </Header>
      <Content>
        <>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={props.feedpost}
            renderItem={(item) => {
              return (
                <>
                  <DiscussionCard discussion={item} />
                  <br />
                </>
              );
            }}
          />
          <PrivateRoute
            path={`${path}/discussion/:discussionID`}
            component={DiscussionDrawer}
          />
        </>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    feedpost: state.feedpost,
  };
};

export default connect(mapStateToProps, {
  fetchRecent,
  fetchPostByRoom,
  fetchRooms,
  fetchPostForFeed,
})(DashboardContent);
