import React from 'react';
import { connect } from 'react-redux';
import { fetchRecent, fetchPostByRoom, fetchRooms } from '../store/actions';
import { Layout } from 'antd';

const Feed = (props) => {
  const { Header, Content } = Layout;

  return (
    <Layout>
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
        <p>Posts...</p>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, {
  fetchRecent,
  fetchPostByRoom,
  fetchRooms,
})(Feed);
