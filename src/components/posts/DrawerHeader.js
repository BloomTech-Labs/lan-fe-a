import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import {
  fetchPost,
  setShowFlagModal,
  setShowModModal,
} from '../../store/actions';

import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Space, Divider, Dropdown } from 'antd';

import { CheckIfModOrAdmin } from '../../utils/CheckIfModOrAdmin';

import { PrivateRoute } from '../../utils/privateRoute';
import DropdownMenu from './DropdownMenu';
// import { FlagChip } from '../FlagChip';
import DiscussionDrawer from './DiscussionDrawer';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DrawerHeader = (props) => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <div>
        <span>
          <Space>
            Posted by
            <Link to={`/user/${props.currentPost.user_id}`}>
              {props.currentPost.display_name}
            </Link>
            <Divider type="vertical" />
            {moment(props.currentPost.created_at).fromNow()}
          </Space>
        </span>
        <span>
          <Divider type="vertical" />
          <IconText
            icon={ArrowUpOutlined}
            text={props.currentPost.likes}
            key="like-or-upvote"
          />
        </span>
        <span>
          <Divider type="vertical" />
          <IconText
            icon={MessageOutlined}
            text={props.currentPost.comments}
            key="list-vertical-message"
          />
        </span>
        <span>
          {CheckIfModOrAdmin(props.user) && (
            <>
              <Divider type="vertical" />
              <Link
                to={`${url}/discussion/${props.currentPost.id}?view=flagged`}
              >
                {/* <FlagChip
                  flags={`${props.discussion.flags.length}`}
                  commentsFlagged={`${props.discussion.flaggedComments.length}`}
                  /> */}
              </Link>
            </>
          )}
        </span>
        <span>
          <Divider type="vertical" />
          <Dropdown overlay={<DropdownMenu />} trigger={['click']}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </span>
      </div>
      <Switch>
        <PrivateRoute
          path={`${path}/discussion/:discussionID`}
          component={DiscussionDrawer}
        />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentPost: state.currentPost,
    discussion: state.posts,
    showModModal: state.showModModal,
    showFlagModal: state.showFlagModal,
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  setShowModModal,
  setShowFlagModal,
})(DrawerHeader);
