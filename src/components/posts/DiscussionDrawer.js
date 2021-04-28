import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
  setShowModModal,
  setShowFlagModal,
  postComment,
  likeComment,
  unlikeComment,
} from '../../store/actions';

import UserFlaggingModal from '../modals/UserFlaggingModal';
import FlagManagerModal from '../modals/FlagManagerModal';
import DiscussionCardHeader from './DrawerHeader';

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
      props.fetchPostCommentsByRecent(discussionID);
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
        props.fetchPost(discussionID);
        props.fetchPostCommentsByRecent(discussionID);
      })
      .catch(() => {
        toast.error('Failed to create a comment on this post.');
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

  const handleLikeComment = (liked, commentID) => {
    liked
      ? props.unlikeComment(commentID).then(() => {
          props.fetchPostCommentsByRecent(discussionID);
        })
      : props.likeComment(commentID).then(() => {
          props.fetchPostCommentsByRecent(discussionID);
        });
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
      <DiscussionCardHeader />

      <FlagManagerModal
        visible={props.showModModal}
        setVisible={props.setShowModModal}
        flagsData={
          props.currentPost.flags ? props.currentPost.flags : undefined
        }
        discussionID={props.currentPost.id}
      />

      <UserFlaggingModal
        visible={props.showFlagModal}
        setVisible={props.setShowFlagModal}
        discussionID={props.currentPost.id}
      />
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
                      <div
                        key="list-vertical-like-o"
                        onClick={() => handleLikeComment(item.liked, item.id)}
                        style={{
                          color: item.liked ? '#405cee' : 'rgba(0,0,0,.45)',
                        }}
                      >
                        <IconText icon={ArrowUpOutlined} text={item.likes} />
                      </div>,
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
    showModModal: state.showModModal,
    showFlagModal: state.showFlagModal,
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
  setShowModModal,
  setShowFlagModal,
  postComment,
  likeComment,
  unlikeComment,
})(DiscussionDrawer);
