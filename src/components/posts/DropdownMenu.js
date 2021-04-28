import React from 'react';
import { connect } from 'react-redux';
import {
  setShowModModal,
  setShowFlagModal,
  fetchPostsAndFlagsByRoom
} from '../../store/actions';

import { Menu } from 'antd';
import {
  PushpinOutlined,
  FlagOutlined,
} from '@ant-design/icons';

import { CheckIfModOrAdmin } from '../../utils/CheckIfModOrAdmin'

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

      {/* {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Divider />
        ) */}
        
      {CheckIfModOrAdmin(props.user) && props.discussion.flags?.length > 0 && (
        <>
          <Menu.Divider />
          <Menu.Item key="3">
            <a onClick={() => props.setShowModModal(!props.showModModal)}>
              <FlagOutlined /> Moderate
            </a>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
} 

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentPost: state.currentPost,
    showModModal: state.showModModal,
    showFlagModal: state.showFlagModal
  };
};

export default connect(mapStateToProps, {
  setShowModModal,
  setShowFlagModal,
  fetchPostsAndFlagsByRoom
  
})(DropdownMenu);