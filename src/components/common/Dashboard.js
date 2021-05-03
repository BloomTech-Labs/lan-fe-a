import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchPrivateRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch,
  fetchFlagReasons,
  fetchPostForFeed,
  fetchCurrentUsersLikedRooms,
} from '../../store/actions';
import { Layout } from 'antd';

import { PrivateRoute } from '../../utils/privateRoute';
import Navbar from './Navbar/Navbar';
import SiderMenu from './SiderMenu';
import DashboardContent from './DashboardContent';
import RoomContent from '../rooms/RoomContent';
import DiscussionDrawer from '../posts/DiscussionDrawer'
import { DashboardHeaderStyles } from '../../styles/components/DashboardStyles';
import { CheckIfModOrAdmin } from '../../utils/CheckIfModOrAdmin';
import FaqContent from './FaqContent';
import ModContent from '../moderator/ModContent';
import ProfileContent from '../profile/ProfileContent';
import AdminContent from '../admin/AdminContent';
import SearchResultsContent from '../search/SearchResultsContent';
import Message from '../instantMessaging/Message';
import Directory from '../directory/Directory';
import BugTracker from '../bugTracker/BugTracker';
import PrivateRoomContent from '../rooms/PrivateRoomContent';
import DiscussionDrawer from '../posts/DiscussionDrawer'

const Dashboard = (props) => {
  const { Content, Sider } = Layout;

  useEffect(() => {
    props.fetchRooms();
    props.fetchPrivateRooms();
    props.fetchCurrentUsersLikedRooms(props.user.id);
    // props.fetchRecent(); // This is throwing an internal server error
    if (Object.keys(props.user).length === 0) {
      props.fetchUser();
    }
  }, [props.currentUsersLikedRooms.length]);

  useEffect(() => {
    if (props.user.role_id) {
      CheckIfModOrAdmin(props.user) && props.fetchFlagReasons();
    }
  }, [props.user.role_id]);

  return (
    <>
      <Layout>
        <DashboardHeaderStyles>
          <Navbar />
        </DashboardHeaderStyles>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <SiderMenu />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <PrivateRoute path="/directory" component={Directory} />
                <PrivateRoute path="/admin-settings" component={AdminContent} />
                <PrivateRoute path="/mod-settings" component={ModContent} />
                <PrivateRoute path="/bug-tracker" component={BugTracker} />
                <PrivateRoute path={`/room/:roomID`} component={RoomContent} />
                <PrivateRoute
                  path={`/private-room/:roomID`}
                  component={PrivateRoomContent}
                />
                <PrivateRoute exact path={`/faq`} component={FaqContent} />
                <PrivateRoute
                  exact
                  path={`/user/:id`}
                  component={ProfileContent}
                />
                <PrivateRoute
                      path={`/discussion/:discussionID`}
                      component={DiscussionDrawer}
                    />
                <PrivateRoute path="/search" component={SearchResultsContent} />
                <PrivateRoute
                  exact
                  path={`/message/send/:user_send_id/receive/:user_receive_id`}
                  component={Message}
                />
                <PrivateRoute exact path={`/`} component={DashboardContent} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUsersLikedRooms: state.currentUsersLikedRooms,
    feedpost: state.feedpost,
    user: state.user,
    rooms: state.rooms,
    privateRooms: state.privateRooms,
    posts: state.posts,
    searchResults: state.mainSearchResults,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  fetchPrivateRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch,
  fetchFlagReasons,
  fetchPostForFeed,
  fetchCurrentUsersLikedRooms,
})(Dashboard);
