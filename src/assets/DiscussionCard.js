import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  Link,
} from 'react-router-dom';
import { Card, Avatar, Modal } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import DiscussionDrawer from './DiscussionDrawer';
import { FlagChip } from './FlagChip';
import {
  setFlaggingModalVisibility,
  fetchPost,
  setDrawerVisibility,
} from '../store/actions/index';

const DiscussionCard = (props) => {
  const { path, url } = useRouteMatch();

  const [showModal, setShowModal] = useState(false);

  return (
    // <Link
    //   to={`${url}/discussion/${props.discussion.id}?view=popular`}
    //   className="discussion-card"
    // >
    <div className="discussion-card">
      <Card
        hoverable="true"
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
        <Link to={`${url}/discussion/${props.discussion.id}?view=flagged`}>
          <FlagChip
            flags={`${props.discussion.flags.length}`}
            commentsFlagged={`${props.discussion.flaggedComments.length}`}
          />
        </Link>
        <UserFlaggingModal discussionID={props.discussion.id} />
        <FlagManagerModal
          visible={showModal}
          setVisible={setShowModal}
          flagsData={props.discussion.flags}
          discussionID={props.discussion.id}
        />
      </Card>
      <Switch>
        <Route
          path={`${path}/discussion/:discussionID`}
          component={DiscussionDrawer}
        ></Route>
      </Switch>
    </div>
    // </Link>
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
