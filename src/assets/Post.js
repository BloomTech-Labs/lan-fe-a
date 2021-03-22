import React from 'react';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Avatar } from 'antd';

const Post = (props) => {
  return (
    <Card
      style={{ margin: '30px 0px' }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
      title={
        <Card.Meta
          avatar={<Avatar src={props.post.profile_picture} />}
          title={props.post.title}
        />
      }
    >
      <p>{props.post.description}</p>
    </Card>
  );
};

export default Post;
