import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
} from '../store/actions';
import { Layout, Input, Form, Collapse, Button } from 'antd';

import DiscussionCard from './DiscussionCard';
import Feed from './Feed';

const RoomContent = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { roomID } = useParams();
  const { Header, Content } = Layout;

  const handleSubmission = (e) => {
    console.log('submission');
    // props
    //   .createRoom({ room_name: title, description: description })
    //   .then(() => {
    //     setTitle('');
    //     setDescription('');
    //     if (props.user.role_id < 2) {
    //       props.fetchPostByRoom(roomID, 1);
    //     } else {
    //       props.fetchPostsAndFlagsByRoom(roomID);
    //     }
    //     // props.fetchRooms();
    //   })
    //   .catch(() => {
    //     console.log('failed to create room');
    //   });
  };

  const inputHandler = (prevValues, curValues) => {
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
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            padding: '0px 0px',
            background: 'none',
            display: 'flex',
            justifyContent: 'flex-start',
            height: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexFlow: 'column wrap',
              alignSelf: 'flex-start',
            }}
          >
            <h2>{findRoom(roomID).room_name}</h2>
            <p>{findRoom(roomID).description}</p>
          </div>
        </Header>
        <Content>
          <Collapse defaultActiveKey={['1']} ghost>
            <Collapse.Panel
              header={<Button type="primary">New Discussion</Button>}
              showArrow={false}
            >
              <Form onFinish={handleSubmission}>
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
                  <Input.TextArea placeholder="What would you like to say?" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit">Submit</Button>
                </Form.Item>
              </Form>
            </Collapse.Panel>
          </Collapse>
          <Feed />
        </Content>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
    discussion: state.posts,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostsAndFlagsByRoom,
})(RoomContent);
