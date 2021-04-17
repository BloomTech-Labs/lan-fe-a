import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
  postComment,
} from '../store/actions';
import {
  Layout,
  Drawer,
  Typography,
  List,
  Avatar,
  Space,
  Divider,
  Card,
  Button,
  Modal,
  Input,
} from 'antd';

import { ArrowUpOutlined } from '@ant-design/icons';

const DiscussionDrawer = (props) => {
  const { discussionID } = useParams();
  const { path, url } = useRouteMatch();
  const { Header, Content } = Layout;
  const { TextArea } = Input;

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  useEffect(() => {
    if (discussionID) {
      props.setDrawerVisibility(true);
      props.fetchPost(discussionID);
      props.fetchPostCommentsByPopular(discussionID);
    }
  }, []);

  const [comment, setComment] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setComment('');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    props
      .postComment(props.user, discussionID, comment)
      .then(() => {
        props.fetchPostCommentsByPopular(discussionID);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setComment('');
    setIsModalVisible(false);
  };

  const handleUpdateChange = (e) => {
    setComment(e.target.value);
  };

  const AddModal = (
    <Modal
      title="Add Comment"
      visible={isModalVisible}
      onOk={handleOk}
      okText="Add"
      onCancel={handleCancel}
    >
      <h4>Comment</h4>
      <TextArea name="comment" value={comment} onChange={handleUpdateChange} />
    </Modal>
  );

  return (
    <Drawer
      visible={props.visible}
      width="65%"
      onClose={() => {
        history.back();
        props.setDrawerVisibility(false);
      }}
    >
      <Layout>
        <Header
          style={{
            padding: '0px 0px',
            display: 'flex',
            justifyContent: 'flex-start',
            height: 'auto',
          }}
        ></Header>
        <Content style={{ background: '#fff' }}>
          <div
            style={{
              display: 'flex',
              flexFlow: 'column wrap',
              alignSelf: 'flex-start',
            }}
          >
            <Typography.Title level={3}>
              {props.currentPost.title}
            </Typography.Title>
            <Typography.Text>{props.currentPost.description}</Typography.Text>
            {AddModal}
            <Card
              size="small"
              title="Comments"
              style={{
                marginTop: '20px',
                height: '0',
              }}
              headStyle={{
                backgroundColor: '#dee2e6',
                color: '#000',
                fontSize: '16px',
              }}
              extra={
                <Button type="primary" onClick={showModal}>
                  Add
                </Button>
              }
            >
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {},
                  pageSize: 10,
                }}
                dataSource={props.currentComments}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <IconText
                        icon={ArrowUpOutlined}
                        text={item.likes}
                        key="list-vertical-like-o"
                      />,
                    ]}
                    extra=""
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.profile_picture} size="large" />
                      }
                      title={
                        <Space style={{ fontSize: '12px' }}>
                          Comment by
                          <Link to={`/user/${item.user_id}`}>
                            {item.display_name}
                          </Link>
                          <Divider type="vertical" />
                          {moment(item.updated_at).fromNow()}
                        </Space>
                      }
                      description={item.comment}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Content>
      </Layout>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    discussions: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
    currentPost: state.currentPost,
    currentComments: state.currentPostComments,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
  postComment,
})(DiscussionDrawer);
