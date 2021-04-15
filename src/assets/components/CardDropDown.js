import React from 'react';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
  PushpinOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { List, Space, Divider, Menu, Dropdown } from 'antd';

import { PrivateRoute } from '../utils/privateRoute';
import { FlagChip } from './FlagChip';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import DiscussionDrawer from './DiscussionDrawer';
import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';

const CardDropDown = (props) = {
  return(

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
      {/* TODO: Move this dropdown list to its own component so that it can be reused in the DiscussionDrawer.js */}
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
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  fetchPostsAndFlagsByRoom,
  fetchPost,
  // setDrawerVisibility,
})(CardDropDown);