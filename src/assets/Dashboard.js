import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch
} from '../store/actions';
import {
  Layout,
  Breadcrumb,
} from 'antd';
import Navbar from './Navbar';
import SiderMenu from './SiderMenu';
import Feed from './Feed';

const Dashboard = (props) => {

  const { Header, Content, Sider } = Layout;

  useEffect(() => {
    props.fetchRooms();
    props.fetchRecent(); // This is throwing an internal server error
    if (Object.keys(props.user).length === 0) {
      props.fetchUser();
    }
  }, []);

  return (
    <Layout>
      <Header className="header" style={{ width: '100%' }}>
        <Navbar/>
      </Header>
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
            <Feed/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
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
  setSearch
})(Dashboard);
