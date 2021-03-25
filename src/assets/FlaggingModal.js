import React from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import { Modal } from 'antd';

const FlaggingModal = (props) => {
  //   const handleFlaggingPost = (reason) => {
  //     props.flagPost(postID, reason, note);
  //   };

  //   const handleFlagModel = (reason) => {
  //     handleFlaggingPost(reason);
  //     props.setFlaggingModalVisibility(false);
  //   };

  return (
    <Modal
      title="Flag Post"
      centered
      visible={props.visible}
      okButtonProps={{ htmlType: 'submit' }}
      onOk={() => props.setFlaggingModalVisibility(false)}
      onCancel={() => props.setFlaggingModalVisibility(false)}
    >
      <p>flagging</p>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    visible: state.isFlaggingModalVisible,
  };
};

export default connect(mapStateToProps, { setFlaggingModalVisibility })(
  FlaggingModal
);
