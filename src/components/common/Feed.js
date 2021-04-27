import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchPostsAndFlagsByRoom,
} from '../../store/actions/index';
import { List, Divider, Select } from 'antd';

import DiscussionCard from '../posts/DiscussionCard';
import DiscussionDrawer from '../posts/DiscussionDrawer';
import SearchResultCard from '../search/SearchResultCard';
import { PrivateRoute } from '../../utils/privateRoute';

const Feed = (props) => {
  const { roomID } = useParams();
  const { path, url } = useRouteMatch();
  const { searchResultsFeed, mainSearchResults } = props;
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (roomID) {
      if (props.user.role_id < 2) props.fetchPostByRoom(roomID, 1);
      else props.fetchPostsAndFlagsByRoom(roomID, 1);
    }
  }, [props.currentPost.comments, like, props.currentPost.likes]);

  return (
    <>
      <Divider orientation="right">
        {`View by: `}
        <Select defaultValue="popular">
          <Select.Option value="popular">Popular</Select.Option>
          <Select.Option value="recent">Recent</Select.Option>
          <Select.Option value="Popular">Flagged</Select.Option>
        </Select>
      </Divider>
      {searchResultsFeed ? (
        <>
          {/* POSTS */}
          {mainSearchResults.posts.length ? (
            <List
              itemLayout="vertical"
              size="large"
              header={<h3>Posts</h3>}
              dataSource={mainSearchResults.posts}
              renderItem={(post) => {
                return (
                  <>
                    {/* model after DiscussionCard component */}
                    <SearchResultCard content={post} cardType="post" />
                    <br />
                  </>
                );
              }}
            />
          ) : (
            ''
          )}

          {/* USERS */}
          {mainSearchResults.users.length ? (
            <List
              itemLayout="vertical"
              size="large"
              header={<h3>Users</h3>}
              dataSource={mainSearchResults.users}
              renderItem={(user) => {
                return (
                  <>
                    <SearchResultCard content={user} cardType="user" />
                    <br />
                  </>
                );
              }}
            />
          ) : (
            ''
          )}

          {/* COMMENTS */}
          {mainSearchResults.comments.length ? (
            <List
              itemLayout="vertical"
              size="large"
              header={<h3>Comments</h3>}
              dataSource={mainSearchResults.comments}
              renderItem={(comment) => {
                return (
                  <>
                    <SearchResultCard content={comment} cardType="comment" />
                    <br />
                  </>
                );
              }}
            />
          ) : (
            ''
          )}

          {/* ROOMS */}
          {mainSearchResults.rooms.length ? (
            <List
              itemLayout="vertical"
              size="large"
              header={<h3>Rooms</h3>}
              dataSource={mainSearchResults.rooms}
              renderItem={(room) => {
                return (
                  <>
                    <SearchResultCard content={room} cardType="room" />
                    <br />
                  </>
                );
              }}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={props.discussion}
            renderItem={(item) => {
              return (
                <>
                  <DiscussionCard
                    discussion={item}
                    updatelike={like}
                    setUpdateLike={setLike}
                  />
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPost: state.currentPost,
    discussion: state.posts,
    user: state.user,
    mainSearchResults: state.mainSearchResults,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchPostsAndFlagsByRoom,
})(Feed);
