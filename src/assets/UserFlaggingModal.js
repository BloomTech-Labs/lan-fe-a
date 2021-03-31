import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility, flagPost } from '../store/actions';
import { Form, Modal, Input, Radio, Alert } from 'antd';

//  TEMPORARY

const reasons = [
  'Spam',
  'Bullying or Harrassment',
  'Hate Speach or Symbols',
  'Nudity or Sexual Content',
  'I just dislike it',
  'Other',
];

const StyledRadioGroup = styled(Radio.Group)`
  width: auto;
  height: 130px;
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-content: space-around;
  padding-bottom: 30px;
  gap: 15px;
`;

const UserFlaggingModal = (props) => {
  const [note, setNote] = useState('');
  const [selection, setSelection] = useState('');
  const [rule, setRule] = useState('');

  const handleSubmition = (e) => {
    e.preventDefault();
    if (selection) {
      props.flagPost(props.discussionID, selection, note);
      props.setFlaggingModalVisibility(false);
      setNote('');
      setRule('');
    } else {
      setRule('Reason required');
    }
  };

  const handleCancellation = () => {
    props.setFlaggingModalVisibility(false);
    setSelection('');
    setRule('');
  };

  return (
    <Modal
      title="Flag this discussion"
      centered
      visible={props.visible}
      okButtonProps={{ htmlType: 'submit' }}
      onOk={handleSubmition}
      onCancel={handleCancellation}
    >
      <Form>
        {rule && <Alert message={rule} type="error" showIcon />}
        <StyledRadioGroup>
          {reasons.map((reason) => {
            return (
              <Radio.Button
                key={reason}
                onChange={(e) => setSelection(e.target.value)}
                value={reason}
              >
                {reason}
              </Radio.Button>
            );
          })}
        </StyledRadioGroup>
        <Form.Item name="note">
          <Input.TextArea
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything else? (Optional)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    visible: state.isFlaggingModalVisible,
  };
};

export default connect(mapStateToProps, {
  setFlaggingModalVisibility,
  flagPost,
})(UserFlaggingModal);
