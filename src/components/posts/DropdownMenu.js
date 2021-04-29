import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setShowModModal,
  setShowFlagModal,
  fetchPostsAndFlagsByRoom,
} from '../../store/actions';

import { Menu } from 'antd';
import { PushpinOutlined, FlagOutlined } from '@ant-design/icons';

import { CheckIfModOrAdmin } from '../../utils/CheckIfModOrAdmin'

const DropdownMenu = (props) => {
  return (
    <Menu>
      <Menu.Item key="0">
        <Link>
          <PushpinOutlined /> Pin
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link onClick={() => props.setShowFlagModal(!props.showFlagModal)}>
          <FlagOutlined /> Flag Discussion
        </Link>
      </Menu.Item>

      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <>
          <Menu.Divider />
          <Menu.Item key="3">
            <Link onClick={() => props.setShowModModal(!props.showModModal)}>
              <FlagOutlined /> Moderate
            </Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentPost: state.currentPost,
    showModModal: state.showModModal,
    showFlagModal: state.showFlagModal,
  };
};

export default connect(mapStateToProps, {
  setShowModModal,
  setShowFlagModal,
  fetchPostsAndFlagsByRoom,
})(DropdownMenu);
