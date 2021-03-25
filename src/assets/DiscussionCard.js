import React, { useState } from 'react';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Avatar, Modal } from 'antd';

import FlagManagerModal from './FlagManagerModal';

const DiscussionCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Card
      onClick={props.onClick}
      style={{ margin: '30px 0px' }}
      actions={[
        <SettingOutlined key="setting" />,
        // vvv Reformat to flag chip that routes you to
        // vvv  discussion with view by set to "flagged"
        <EditOutlined
          key="edit"
          onClick={() => {
            setShowModal(true);
          }}
        />,
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
      <FlagManagerModal visible={showModal} setVisible={setShowModal} />
    </Card>
  );
};

export default DiscussionCard;
