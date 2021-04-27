import React, { useState } from 'react';
import { connect } from 'react-redux';
import { flagPost } from '../../store/actions';
import { Form, Modal, Input, Radio, Alert } from 'antd';
import { StyledRadioGroup } from '../../styles/components/UserFlaggingModalStyles';

//  TEMPORARY
// Replace below reasons with reasons grabbed from global state
const reasons = [
  'Spam',
  'Bullying or Harassment',
  'Hate Speech or Symbols',
  'Nudity or Sexual Content',
  'I just dislike it',
  'Other',
];

const UserFlaggingModal = (props) => {
  const [note, setNote] = useState('');
  const [selection, setSelection] = useState('');
  const [rule, setRule] = useState('');

  const handleSubmission = (e) => {
    e.preventDefault();
    if (selection) {
      props.flagPost(props.discussionID, selection, note);
      props.setVisible(false);
      setNote('');
      setRule('');
    } else {
      setRule('Reason required');
    }
  };

  const handleCancellation = () => {
    props.setVisible(false);
    setSelection('');
    setRule('');
  };

  return (
    <Modal
      title="Flag this discussion"
      centered
      visible={props.visible}
      okButtonProps={{ htmlType: 'submit' }}
      onOk={handleSubmission}
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
  return {};
};

export default connect(mapStateToProps, {
  flagPost,
})(UserFlaggingModal);
