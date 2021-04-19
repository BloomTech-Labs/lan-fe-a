import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
  setShowModal,
  setShowFlagModal
} from '../store/actions';

import { Drawer } from 'antd';
import { useParams } from 'react-router-dom';

import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import DiscussionCardHeader from './components/DrawerHeader';


const DiscussionDrawer = (props) => {
  const { discussionID } = useParams();

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
        visible={props.showModal}
        setVisible={props.setShowModal}
        flagsData={props.currentPost.flags ? props.currentPost.flags : undefined}
        discussionID={props.currentPost.id}
        />

      <UserFlaggingModal
        visible={props.showFlagModal}
        setVisible={props.setShowFlagModal}
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
    showModal: state.showModal,
    showFlagModal: state.showFlagModal
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
  setShowModal,
  setShowFlagModal
})(DiscussionDrawer);
