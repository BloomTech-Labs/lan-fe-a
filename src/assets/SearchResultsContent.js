import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
  postQuestion,
} from '../store/actions';

import { Layout } from 'antd';

import Feed from './Feed';

const SearchResultsContent = () => {
    const { Header, Content } = Layout;

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
