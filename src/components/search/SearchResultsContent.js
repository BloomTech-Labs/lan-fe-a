import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
  postQuestion,
} from '../../store/actions';
import { Layout } from 'antd';
import { Switch, useRouteMatch } from 'react-router-dom';

import Feed from '../common/Feed';
import { PrivateRoute } from '../../utils/privateRoute';
import DiscussionDrawer from '../posts/DiscussionDrawer';

const SearchResultsContent = () => {
    const { Header, Content } = Layout;
    const { path } = useRouteMatch();

    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Header
        style={{
            padding: '0px 0px',
            background: 'none',
            display: 'flex',
            justifyContent: 'flex-start',
            height: 'auto',
        }}
        >
            <div
                style={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '100%',
                }}
            >
                <div
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                >
                    <h2
                        style={{
                        marginBottom: '0px',
                        fontSize: '35px'
                        }}
                    >
                        Search Results
                    </h2>
                </div>
            </div>
        </Header>
        <Content>
            <Feed searchResultsFeed/>
        </Content>
        <Switch>
            <PrivateRoute
            path={`${path}/discussion/:discussionID`}
            component={DiscussionDrawer}
            />
        </Switch>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
    discussion: state.posts,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
  postQuestion,
})(SearchResultsContent);
