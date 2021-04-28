import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  createRoom,
  fetchRooms,
  setNewRoomModalVisibility,
} from '../../store/actions';
import { Form, Modal, Input } from 'antd';

const CreateNewRoomButton = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const inputHandler = (prevValues, curValues) => {
    setTitle(curValues.title);
    setDescription(curValues.description);
  };

  const handleSubmition = (e) => {
    props
      .createRoom({ room_name: title, description: description })
      .then(() => {
        setTitle('');
        setDescription('');
        props.fetchRooms();
      })
      .catch(() => {
        toast.error('There was a problem creating a new room.');
      });
    props.setNewRoomModalVisibility(false);
  };

  return (
    <Modal
      title="Create Room"
      centered
      visible={props.visible}
      okButtonProps={{ htmlType: 'submit' }}
      onOk={handleSubmition}
      onCancel={() => props.setNewRoomModalVisibility(false)}
    >
      <Form>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Title required' }]}
          shouldUpdate={inputHandler}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Description required' }]}
          shouldUpdate={inputHandler}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    visible: state.isNewRoomModalVisible,
  };
};

export default connect(mapStateToProps, {
  createRoom,
  fetchRooms,
  setNewRoomModalVisibility,
})(CreateNewRoomButton);
