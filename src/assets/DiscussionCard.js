import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PushpinFilled,
  PushpinOutlined,
} from '@ant-design/icons';
import { Card, Avatar, Modal } from 'antd';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';

const DiscussionCard = (props) => {
  const { pinPost } = props;
  const [showModal, setShowModal] = useState(false);

  const actions = [
    <SettingOutlined key="setting" />,
    //! vvv Reformat to flag chip that routes you to
    //! vvv  discussion with view by set to "flagged"
    <EditOutlined
      key="edit"
      onClick={() => {
        setShowModal(true);
      }}
    />,
    <EllipsisOutlined
      key="ellipsis"
      onClick={() => props.setFlaggingModalVisibility(true)}
    />,
  ];

  // Some attributes depend on whether the post is pinned or not
  if (pinPost) {
    actions.push(
      <PushpinFilled key="pushpin" onClick={() => console.log('im pinned')} />
    );
  } else {
    actions.push(
      <PushpinOutlined
        key="pushpin"
        onClick={() => console.log('im not pinned')}
      />
    );
  }

  return (
    <Card
      onClick={props.onClick}
      style={{ margin: '30px 0px' }}
      actions={[...actions]}
      title={
        <Card.Meta
          avatar={<Avatar src={props.discussion.profile_picture} />}
          title={props.discussion.title}
        />
      }
    >
      <p>{props.discussion.description}</p>
      <FlagManagerModal visible={showModal} setVisible={setShowModal} />
      {/* //!Change below prop to discussionId and fix in FlaggingModal Component */}
      {/* <UserFlaggingModal postId={props.discussion.id} /> */}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
  };
};

export default connect(mapStateToProps, { setFlaggingModalVisibility })(
  DiscussionCard
);
