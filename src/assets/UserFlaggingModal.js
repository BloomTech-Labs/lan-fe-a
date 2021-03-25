import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  createRoom,
  fetchRooms,
  setFlaggingModalVisibility,
} from '../store/actions';
import { Form, Modal, Input } from 'antd';

const CreateNewRoomButton = (props) => {
  const handleSubmition = (e) => {
    props.setFlaggingModalVisibility(false);
  };

  return (
    <Modal
      title="Flag this discussion"
      centered
      visible={props.visible}
      okButtonProps={{ htmlType: 'submit' }}
      onOk={handleSubmition}
      onCancel={() => props.setFlaggingModalVisibility(false)}
    >
      <p>modal working</p>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    visible: state.isFlaggingModalVisible,
  };
};

export default connect(mapStateToProps, {
  createRoom,
  fetchRooms,
  setFlaggingModalVisibility,
})(CreateNewRoomButton);
