// This is an attempt to move redundant code out of DrawerHeader and DiscussionCard by making the dropdown pin/flag menu into it's own component

import React, {useState} from 'react';
import { connect } from 'react-redux';
import {
  setShowModal,
  setShowFlagModal
} from '../../store/actions';

import { Menu } from 'antd';
import {
  PushpinOutlined,
  FlagOutlined,
} from '@ant-design/icons';

import { CheckIfModOrAdmin } from '../CheckIfModOrAdmin'

const dropdownMenu = (props) => {
  // const [showFlagModal, setShowFlagModal] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  console.log(props.showModal)
  console.log(props.showFlagModal)
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
          setShowFlagModal(true)}>
          <FlagOutlined /> Flag Discussion
        </a>
      </Menu.Item>
      
      {/* TODO: test if I don't need 2 lines of CheckIfModOrAdmin and see if I can get away with just one */}
      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Divider />
      )}
  
      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Item key="3">
          <a onClick={() => setShowModal(true)}>
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
  
})(dropdownMenu);