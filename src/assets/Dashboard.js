import React, { useEffect } from 'react';
import { useRouteMatch, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch,
  fetchFlagReasons,
} from '../store/actions';
import { Layout, Breadcrumb } from 'antd';

import { PrivateRoute } from '../utils/privateRoute';
import Navbar from './Navbar';
import SiderMenu from './SiderMenu';
import DashboardContent from './DashboardContent';
import RoomContent from './RoomContent';
import { DashboardHeaderStyles } from '../styles/components/DashboardStyles';
import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';

const Dashboard = (props) => {
  const { path } = useRouteMatch();

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
      console.log(props.user);
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
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <PrivateRoute
                  path={`${path}/room/:roomID`}
                  component={RoomContent}
                />
                <PrivateRoute
                  exact
                  path={`${path}/`}
                  component={DashboardContent}
                />
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
