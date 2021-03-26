import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch,
} from '../store/actions';
import { Layout, Breadcrumb } from 'antd';

import Navbar from './Navbar';
import SiderMenu from './SiderMenu';
import DashboardContent from './DashboardContent';
import Room from './Room';

const DashboardHeaderStyles = styled(Layout.Header)`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 30);
`;

const Dashboard = (props) => {
  const { path } = useRouteMatch();

  const { Header, Content, Sider } = Layout;
  useEffect(() => {
    props.fetchRooms();
    // props.fetchRecent(); // This is throwing an internal server error
    if (Object.keys(props.user).length === 0) {
      props.fetchUser();
    }
  }, []);

  return (
    <>
      <Layout style={{ height: '100vh' }}>
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
              <DashboardContent />
            </Content>
          </Layout>
        </Layout>
      </Layout>

      <Switch>
        <Route path={`${path}/room/:id`}>
          <Room />
        </Route>
      </Switch>
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
})(Dashboard);
