import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
} from '../store/actions';

import { Drawer } from 'antd';
import { useParams } from 'react-router-dom';

import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import DiscussionCardHeader from './components/DiscussionCardHeader';


const DiscussionDrawer = (props) => {
  const { discussionID } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);


  useEffect(() => {
    if (discussionID) {
      props.setDrawerVisibility(true);
      props.fetchPost(discussionID);
    }
  }, []);

  return (
    <Drawer
      visible={props.visible}
      width="65%"
      onClose={() => {
        history.back();
        props.setDrawerVisibility(false);
      }}
    >
      <DiscussionCardHeader/>

      <FlagManagerModal
        visible={showModal}
        setVisible={setShowModal}
        flagsData={props.currentPost.flags ? props.currentPost.flags : undefined}
        discussionID={props.currentPost.id}
        />

      <UserFlaggingModal
        visible={showFlagModal}
        setVisible={setShowFlagModal}
        discussionID={props.currentPost.id}
        />
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    user: state.user,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
    currentPost: state.currentPost,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
})(DiscussionDrawer);
