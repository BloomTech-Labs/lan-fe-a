import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
  postQuestion,
  addToCurrentUsersLikedRooms,
  deleteCurrentRoomFromLikedRooms
} from '../../store/actions';

import { Layout, Input, Form, Button, Modal } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import Feed from '../common/Feed';

const RoomContent = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { roomID } = useParams();
  const { Header, Content } = Layout;

  // state for modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // modal funcs
  const showNewCardModal = () => setVisible(true);

  // TODO: this is not an ideal solution eventually we will need proper error handling
  // for posting when empty/double posting
  const handleOk = () => {
    title &&
      description &&
      props
        .postQuestion(title, description, roomID)
        .then(() => {
          setTitle('');
          setDescription('');
          if (props.user.role_id < 2) {
            props.fetchPostByRoom(roomID, 1);
          } else {
            props.fetchPostsAndFlagsByRoom(roomID);
          }
          // props.fetchRooms();
        })
        .catch(() => {
          toast.error('Failed to create new room.');
        });
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleLikeRoomButtonClicked = () =>
    props.addToCurrentUsersLikedRooms(props.user.id, roomID);

  const handleUnlikeRoomButtonClicked = () =>
    props.deleteCurrentRoomFromLikedRooms(props.user.id, roomID);

  const handleCancel = () => setVisible(false);

  const inputHandler = (curValues) => {
    setTitle(curValues.title);
    setDescription(curValues.description);
  };

  const findRoom = (_id) => {
    const currentRoom = props.rooms.filter((r) => r.id === parseInt(_id))[0];
    if (currentRoom) {
      return currentRoom;
    } else {
      return {
        room_name: 'ROOM NOT FOUND',
        description: '',
      };
    }
  };

  return (
    <Layout className="room-content">
      <Header>
        <div className="room-header">
          <div className="room-context-and-form">
            <div className="room-name-and-heart">
              <h2>{findRoom(roomID).room_name}</h2>

              {props.currentUsersLikedRooms.includes(Number(roomID)) ? (
                <HeartFilled
                  className="heart-icon"
                  onClick={handleUnlikeRoomButtonClicked}
                />
              ) : (
                <HeartOutlined
                  className="heart-icon"
                  onClick={handleLikeRoomButtonClicked}
                />
              )}
            </div>

            {/* button to open modal */}
            <Button type="primary" onClick={showNewCardModal}>
              New Discussion
            </Button>

            <Modal
              title="Title"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              {/* TODO: after submitting these fields do NOT empty out (along with the state) */}
              <Form>
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: 'Title required' }]}
                  shouldUpdate={inputHandler}
                  value={title}
                >
                  <Input placeholder="Title" />
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[{ required: true, message: 'Description required' }]}
                  shouldUpdate={inputHandler}
                  value={description}
                >
                  <Input.TextArea placeholder="What would you like to say?" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <p id="room-description">{findRoom(roomID).description}</p>
        </div>
      </Header>
      <Content>
        <Feed />
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
    discussion: state.posts,
    user: state.user,
    currentUsersLikedRooms: state.currentUsersLikedRooms,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
  postQuestion,
  addToCurrentUsersLikedRooms,
  deleteCurrentRoomFromLikedRooms,
})(RoomContent);
