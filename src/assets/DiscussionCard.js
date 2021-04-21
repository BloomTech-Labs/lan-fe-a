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
} from '../store/actions/index';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { List, Space, Divider, Dropdown } from 'antd';
import { useRouteMatch, Link, useParams } from 'react-router-dom';

import DropdownMenu from './components/DropdownMenu';
import { FlagChip } from './FlagChip';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';

import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';

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
        style={{ background: 'white' }}
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
              <FlagChip
                flags={`${props.discussion.flags.length}`}
                commentsFlagged={`${props.discussion.flaggedComments.length}`}
              />
            </Link>
          )
        ]}
      >
        <List.Item.Meta
            title={
              <div className="discussion-header-styles">
                <Link to={`${url}/discussion/${props.discussion.id}?view=recent`}>
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
                <Link to={`/user/${props.discussion.user_id}`}>
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
