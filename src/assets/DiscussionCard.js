import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  fetchPostsAndFlagsByRoom,
  fetchPost,
  setDrawerVisibility,
} from '../store/actions/index';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
  PushpinOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { List, Space, Divider, Menu, Dropdown } from 'antd';
import { Switch, useRouteMatch, Link, useParams } from 'react-router-dom';

import { PrivateRoute } from '../utils/privateRoute';
import { FlagChip } from './FlagChip';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import DiscussionDrawer from './DiscussionDrawer';
import DCardDropdown from './DCardDropdown';
import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DiscussionCard = (props) => {
  const { path, url } = useRouteMatch();
  const { roomID } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);

  const flagsLength = props.discussion.flags
    ? props.discussion.flags.length
    : 0;

  useEffect(() => {
    if (props.user.role_id > 2) props.fetchPostsAndFlagsByRoom(roomID, 1);
  }, [flagsLength]);

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="0">
        <a>
          <PushpinOutlined /> Pin
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a onClick={() => setShowFlagModal(true)}>
          <FlagOutlined /> Flag Discussion
        </a>
      </Menu.Item>

      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Divider />
      )}

      {CheckIfModOrAdmin(props.user) && props.discussion.flags.length > 0 && (
        <Menu.Item key="3">
          <a onClick={() => setShowModal(true)}>
            <FlagOutlined /> Moderate
          </a>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <List.Item
      className="discussion-card"
      key={props.discussion.title}
      style={{ background: 'white'}}
      grid={{ column: 4 }}
      actions={[
        <IconText
          icon={ArrowUpOutlined}
          text={props.discussion.likes}
          key="like-or-upvote"
        />,
        <IconText
          icon={MessageOutlined}
          text={props.discussion.comments}
          key="list-vertical-message"
        />,
        CheckIfModOrAdmin(props.user) && (
          <Link to={`${url}/discussion/${props.discussion.id}?view=flagged`}>
            <FlagChip
              flags={`${props.discussion.flags.length}`}
              commentsFlagged={`${props.discussion.flaggedComments.length}`}
            />
          </Link>
        ),
      ]}
    >
      <List.Item.Meta
        title={
          <div className="discussion-header-styles">
            <Link to={`${url}/discussion/${props.discussion.id}?view=popular`} >
              {props.discussion.title}
            </Link>
            <Dropdown overlay={dropdownMenu} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <EllipsisOutlined />
              </a>
            </Dropdown>
          </div>
        }
        description={
          <Space>
            Posted by
            <Link to={`/user/${props.discussion.user_id}`} >
              {props.discussion.display_name}
            </Link>
            <Divider type="vertical" />
            {moment(props.discussion.created_at).fromNow()}
          </Space>
        }
      />
      {props.discussion.description}

        {/* TODO: Moves these next 2 modals into their own component so that they can be reused in the DiscussionDrawer.js */}
      <FlagManagerModal
        visible={showModal}
        setVisible={setShowModal}
        flagsData={props.discussion.flags ? props.discussion.flags : undefined}
        discussionID={props.discussion.id}
      />

      <UserFlaggingModal
        visible={showFlagModal}
        setVisible={setShowFlagModal}
        discussionID={props.discussion.id}
      />

      <Switch>
        <PrivateRoute
          path={`${path}/discussion/:discussionID`}
          component={DiscussionDrawer}
        />
      </Switch>
    </List.Item>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  fetchPostsAndFlagsByRoom,
  fetchPost,
  setDrawerVisibility,
})(DiscussionCard);
