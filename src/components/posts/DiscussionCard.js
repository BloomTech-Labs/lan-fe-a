import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  fetchPostsAndFlagsByRoom,
  fetchPost,
  fetchPostByRoom,
  setDrawerVisibility,
  setShowFlagModal,
  setShowModModal,
  like,
  unlike,
} from '../../store/actions/index';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { List, Space, Divider, Dropdown } from 'antd';
import { useRouteMatch, Link } from 'react-router-dom';

import DropdownMenu from './DropdownMenu';
import { FlagChip } from '../moderator/FlagChip';
import UserFlaggingModal from '../modals/UserFlaggingModal';
import FlagManagerModal from '../modals/FlagManagerModal';

import { CheckIfModOrAdmin } from '../../utils/CheckIfModOrAdmin';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DiscussionCard = (props) => {
  const { path, url } = useRouteMatch();

  const handleLikePost = () => {
    props.discussion.liked
      ? props.unlike(props.discussion.id).then(() => {
          props.setUpdateLike(!props.updatelike);
        })
      : props.like(props.discussion.id).then(() => {
          props.setUpdateLike(!props.updatelike);
        });
  };

  return (
    <>
      <List.Item
        className="discussion-card"
        key={props.discussion.title}
        grid={{ column: 4 }}
        actions={[
          <div
            key="like-or-upvote"
            onClick={handleLikePost}
            style={{
              color: props.discussion.liked ? '#405cee' : 'rgba(0,0,0,.45)',
            }}
          >
            <IconText icon={ArrowUpOutlined} text={props.discussion.likes} />
          </div>,
          <Link
            to={`${url}/discussion/${props.discussion.id}?view=recent`}
            key="list-vertical-message"
            style={{
              textDecoration: 'none',
              color: props.discussion.comments ? '#405cee' : 'rgba(0,0,0,.45)',
            }}
          >
            <IconText icon={MessageOutlined} text={props.discussion.comments} />
          </Link>,
          CheckIfModOrAdmin(props.user) && (
            <Link to={`${url}/discussion/${props.discussion.id}?view=flagged`}>
              {/* <FlagChip
                flags={`${props.discussion.flags.length}`}
                commentsFlagged={`${props.discussion.flaggedComments.length}`}
              /> */}
            </Link>
          ),
        ]}
      >
        <Link to={`${url}/discussion/${props.discussion.id}?view=recent`}>
          <div>
            <List.Item.Meta
              title={
                <div className="discussion-header-styles">
                  {props.discussion.title}
                  <Dropdown overlay={<DropdownMenu />} trigger={['click']}>
                    <div className="ant-dropdown-link-div">
                      <Link
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <EllipsisOutlined />
                      </Link>
                    </div>
                  </Dropdown>
                </div>
              }
              description={
                <Space>
                  Posted by
                  <Link
                    to={`/user/${props.discussion.user_id}`}
                    style={{ color: '#405CEE' }}
                  >
                    {props.discussion.display_name}
                  </Link>
                  <Divider type="vertical" />
                  {moment(props.discussion.created_at).fromNow()}
                </Space>
              }
            />
            {props.discussion.description}
          </div>
        </Link>
        <FlagManagerModal
          visible={props.showModModal}
          setVisible={props.setShowModModal}
          flagsData={
            props.discussion.flags ? props.discussion.flags : undefined
          }
          discussionID={props.discussion.id}
        />
        <UserFlaggingModal
          visible={props.showFlagModal}
          setVisible={props.setShowFlagModal}
          discussionID={props.discussion.id}
        />
      </List.Item>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    showModModal: state.showModModal,
    showFlagModal: state.showFlagModal,
    currentPost: state.currentPost,
  };
};

export default connect(mapStateToProps, {
  fetchPostsAndFlagsByRoom,
  fetchPost,
  fetchPostByRoom,
  setDrawerVisibility,
  setShowModModal,
  setShowFlagModal,
  like,
  unlike,
})(DiscussionCard);
