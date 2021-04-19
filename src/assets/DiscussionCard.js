import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  fetchPostsAndFlagsByRoom,
  fetchPost,
  setDrawerVisibility,
  setShowFlagModal, 
  setShowModModal
} from '../store/actions/index';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { List, Space, Divider, Dropdown } from 'antd';
import { Switch, useRouteMatch, Link, useParams } from 'react-router-dom';

import { PrivateRoute } from '../utils/privateRoute';
import DropdownMenu from './components/DropdownMenu';
import { FlagChip } from './FlagChip';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import DiscussionDrawer from './DiscussionDrawer';
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


  const flagsLength = props.discussion.flags
    ? props.discussion.flags.length
    : 0;

  useEffect(() => {
    if (props.user.role_id > 2) props.fetchPostsAndFlagsByRoom(roomID, 1);
  }, [flagsLength]);

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
            <Dropdown overlay={<DropdownMenu/>} trigger={['click']}>
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

      <FlagManagerModal
        visible={props.showModModal}
        setVisible={props.setShowModModal}
        flagsData={props.discussion.flags ? props.discussion.flags : undefined}
        discussionID={props.discussion.id}
      />

      <UserFlaggingModal
        visible={props.showFlagModal}
        setVisible={props.setShowFlagModal}
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
    showModModal: state.showModModal,
    showFlagModal: state.showFlagModal
  };
};

export default connect(mapStateToProps, {
  fetchPostsAndFlagsByRoom,
  fetchPost,
  setDrawerVisibility,
  setShowModModal,
  setShowFlagModal,
})(DiscussionCard);
