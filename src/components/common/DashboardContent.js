import React from 'react';
import { connect } from 'react-redux';
import { fetchRecent, fetchPostByRoom, fetchRooms } from '../../store/actions';
import { Layout } from 'antd';

// import Feed from './Feed';

const DashboardContent = () => {
  const { Header, Content } = Layout;

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
        <p>(Dynamic Newsfeed Here)</p>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  fetchRecent,
  fetchPostByRoom,
  fetchRooms,
})(DashboardContent);
