import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch,
  fetchFlagReasons,
} from '../store/actions';
import { Layout } from 'antd';

import { PrivateRoute } from '../utils/privateRoute';
import Navbar from './Navbar';
import SiderMenu from './SiderMenu';
import DashboardContent from './DashboardContent';
import RoomContent from './RoomContent';
import { DashboardHeaderStyles } from '../styles/components/DashboardStyles';
import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';
import FaqContent from './FaqContent';
import ModContent from './ModContent';
import ProfileContent from './ProfileContent';
import AdminContent from './AdminContent';
import SearchResultsContent from './SearchResultsContent';
import Message from './Message';
import Directory from './Directory';
import BugTracker from './BugTracker';

const Dashboard = (props) => {
  const { Content, Sider } = Layout;

  useEffect(() => {
    props.fetchRooms();
    // props.fetchRecent(); // This is throwing an internal server error
    if (Object.keys(props.user).length === 0) {
      props.fetchUser();
    }
  }, []);

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
                <PrivateRoute exact path={`/faq`} component={FaqContent} />
                <PrivateRoute
                  exact
                  path={`/user/:id`}
                  component={ProfileContent}
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
    user: state.user,
    rooms: state.rooms,
    posts: state.posts,
    searchResults: state.mainSearchResults,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch,
  fetchFlagReasons,
})(Dashboard);
