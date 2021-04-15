import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
} from '../store/actions';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
  PushpinOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { List, Space, Divider, Menu, Dropdown, Drawer } from 'antd';
import { Link, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';

import { PrivateRoute } from '../utils/privateRoute';
import { FlagChip } from './FlagChip';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// import DiscussionCard from './DiscussionCard';

const DiscussionDrawer = (props) => {
  const { discussionID } = useParams();
  const { path, url } = useRouteMatch();
  // const { Header, Content } = Layout;
  const [showModal, setShowModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);


  useEffect(() => {
    if (discussionID) {
      props.setDrawerVisibility(true);
      props.fetchPost(discussionID);
    }
  }, []);

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



  // return (
  //   <Drawer
  //     visible={props.visible}
  //     width="65%"
  //     onClose={() => {
  //       history.back();
  //       props.setDrawerVisibility(false);
  //     }}
  //   >
  //     <Layout>
  //       <Header
  //         style={{
  //           padding: '0px 0px',
  //           display: 'flex',
  //           justifyContent: 'flex-start',
  //           height: 'auto',
  //         }}
  //       ></Header>
  //       <Content style={{ background: '#fff' }}>
  //         <div
  //           style={{
  //             display: 'flex',
  //             flexFlow: 'column wrap',
  //             alignSelf: 'flex-start',
  //           }}
  //         >
  //           <Typography.Title level={3}>
  //             {props.currentPost.title}
  //           </Typography.Title>
  //           <Typography.Text>{props.currentPost.description}</Typography.Text>
  //         </div>
  //       </Content>
  //     </Layout>
  //   </Drawer>
  // );
  return (
    <Drawer
      visible={props.visible}
      width="65%"
      onClose={() => {
        history.back();
        props.setDrawerVisibility(false);
      }}
    >
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
    </Drawer>
  );

  



};

const mapStateToProps = (state) => {
  return {
    discussions: state.posts,
    rooms: state.rooms,
    visible: state.isDrawerVisible,
    currentPost: state.currentPost,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchRooms,
  setDrawerVisibility,
  fetchPost,
  fetchPostCommentsByRecent,
  fetchPostCommentsByPopular,
})(DiscussionDrawer);
