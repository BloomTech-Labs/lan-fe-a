import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  setFlaggingModalVisibility,
  fetchPost,
  setDrawerVisibility,
} from '../store/actions/index';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Avatar, Modal } from 'antd';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import { FlagChip } from './FlagChip';
import DiscussionDrawer from './DiscussionDrawer';

const DiscussionCard = (props) => {
  const { path, url } = useRouteMatch();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="discussion-card">
      <Card
        hoverable="true"
        onClick={() => {
          window.history.pushState(
            {},
            null,
            `${url}/discussion/${props.discussion.id}`
          );
          props.fetchPost(props.discussion.id);
          props.setDrawerVisibility(true);
        }}
        style={{ margin: '30px 0px' }}
        actions={[
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
        ]}
        title={
          <Card.Meta
            avatar={<Avatar src={props.discussion.profile_picture} />}
            title={props.discussion.title}
          />
        }
      >
        <p>{props.discussion.description}</p>
        <FlagChip flags={props.discussion.flags.length} commentsFlagged="5" />
        <FlagManagerModal visible={showModal} setVisible={setShowModal} />
        {/* //!Change below prop to discussionId and fix in UserFlaggingModal Component */}
        <UserFlaggingModal discussionID={props.discussion.id} />
      </Card>
      <Switch>
        <Route
          path={`${path}/discussion/:discussionID`}
          component={DiscussionDrawer}
        ></Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  setFlaggingModalVisibility,
  fetchPost,
  setDrawerVisibility,
})(DiscussionCard);
