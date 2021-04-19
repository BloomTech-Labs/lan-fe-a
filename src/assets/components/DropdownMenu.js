// This is an attempt to move redundant code out of DrawerHeader and DiscussionCard by making the dropdown pin/flag menu into it's own component

import React from 'react';
import { connect } from 'react-redux';
import {
  setShowModal,
  setShowFlagModal,
  fetchPostsAndFlagsByRoom
} from '../../store/actions';

import { Menu } from 'antd';
import {
  PushpinOutlined,
  FlagOutlined,
} from '@ant-design/icons';

import { CheckIfModOrAdmin } from '../CheckIfModOrAdmin'

const DropdownMenu = (props) => {

  return(
    <Menu>
      <Menu.Item key="0">
        <a>
          <PushpinOutlined /> Pin
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a onClick={() => 
          props.setShowFlagModal(!props.showFlagModal)}>
          <FlagOutlined /> Flag Discussion
        </a>
      </Menu.Item>
      
      {/* TODO: Combine these 2 lines of CheckIfModOrAdmin into just one */}
      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Divider />
      )}
  
      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Item key="3">
          <a onClick={() => props.setShowModal(!props.showModal)}>
            <FlagOutlined /> Moderate
          </a>
        </Menu.Item>
      )}
    </Menu>
  );
} 

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentPost: state.currentPost,
    showModal: state.showModal,
    showFlagModal: state.showFlagModal
  };
};

export default connect(mapStateToProps, {
  setShowModal,
  setShowFlagModal,
  fetchPostsAndFlagsByRoom
  
})(DropdownMenu);