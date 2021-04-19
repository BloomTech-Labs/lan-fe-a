import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchPostsAndFlagsByRoom,
} from '../store/actions/index';
import { List, Divider, Select } from 'antd';

import DiscussionCard from './DiscussionCard';

const Feed = (props) => {
  const { roomID } = useParams();
  
  useEffect(() => {
    if (roomID) {
      if (props.user.role_id < 2) props.fetchPostByRoom(roomID, 1);
      else props.fetchPostsAndFlagsByRoom(roomID, 1);
    }
  }, []);

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
      <List
        itemLayout="vertical"
        size="large"
        dataSource={props.discussion}
        renderItem={(item) => {
          return (
            <>
              <DiscussionCard discussion={item} />
              <br />
            </>
          );
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    discussion: state.posts,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchPostsAndFlagsByRoom,
})(Feed);
