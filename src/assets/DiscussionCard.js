import React from 'react';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Avatar } from 'antd';

const DiscussionCard = (props) => {
  return (
    <Card
      onClick={props.onClick}
      style={{ margin: '30px 0px' }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
      title={
        <Card.Meta
          avatar={<Avatar src={props.discussion.profile_picture} />}
          title={props.discussion.title}
        />
      }
    >
      <p>{props.discussion.description}</p>
    </Card>
  );
};

export default DiscussionCard;
