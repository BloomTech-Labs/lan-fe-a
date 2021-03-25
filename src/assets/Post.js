import React from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Avatar } from 'antd';
import UserFlaggingModal from './UserFlaggingModal';

const Post = (props) => {
  return (
    <Card
      onClick={props.onClick}
      style={{ margin: '30px 0px' }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined
          key="ellipsis"
          onClick={() => props.setFlaggingModalVisibility(true)}
        />,
      ]}
      title={
        <Card.Meta
          avatar={<Avatar src={props.post.profile_picture} />}
          title={props.post.title}
        />
      }
    >
      <p>{props.post.description}</p>
      <UserFlaggingModal />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
  };
};

export default connect(mapStateToProps, { setFlaggingModalVisibility })(Post);
