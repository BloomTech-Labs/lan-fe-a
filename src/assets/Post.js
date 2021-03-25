import React from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Avatar } from 'antd';

import FlaggingModal from './FlaggingModal';

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
      <FlaggingModal postId={props.post.id} />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    visible: state.isFlaggingModalVisible,
  };
};

export default connect(mapStateToProps, { setFlaggingModalVisibility })(Post);
