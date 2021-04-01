import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  setFlaggingModalVisibility,
  fetchPost,
  setDrawerVisibility,
} from '../store/actions/index';
// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Card, Avatar, Modal, List, Popover, Space, Divider } from 'antd';
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  Link,
} from 'react-router-dom';

import { PrivateRoute } from '../utils/privateRoute';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import { FlagChip } from './FlagChip';
import DiscussionDrawer from './DiscussionDrawer';
import PopoverContent from './PopoverContent';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DiscussionHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DiscussionCard = (props) => {
  const { path, url } = useRouteMatch();

  const [popoverVisibility, setPopoverVisibility] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <List.Item
      key={props.item.title}
      style={{ background: 'white' }}
      grid={{ column: 4 }}
      actions={[
        <IconText
          icon={ArrowUpOutlined}
          text={props.item.likes}
          key="like-or-upvote"
        />,
        <IconText
          icon={MessageOutlined}
          text={props.item.comments}
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        title={
          <DiscussionHeaderStyles>
            <Link to={`${url}/discussion/${props.item.id}?view=popular`}>
              {props.item.title}
            </Link>
            <Popover
              placement="topRight"
              content={
                <PopoverContent setPopoverVisibility={setPopoverVisibility} />
              }
              trigger="click"
              visible={popoverVisibility}
              onVisibleChange={(visible) => setPopoverVisibility(visible)}
            >
              {/* <MoreOutlined /> */}
              <EllipsisOutlined />
            </Popover>
          </DiscussionHeaderStyles>
        }
        description={
          <Space>
            Posted by
            <Link to={`/user/${props.item.user_id}`}>
              {props.item.display_name}
            </Link>
            <Divider type="vertical" />
            {moment(props.item.created_at).fromNow()}
          </Space>
        }
      />
      {props.item.description}
      {props.item.flags && (
        <Link
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          to={`${url}/discussion/${props.item.id}?view=flagged`}
        >
          <FlagChip flags={props.item.flags.length} />
        </Link>
      )}
      <Switch>
        <PrivateRoute
          path={`${path}/discussion/:discussionID`}
          component={DiscussionDrawer}
        />
      </Switch>
    </List.Item>
    // <Link
    //   to={`${url}/discussion/${props.discussion.id}?view=popular`}
    //   className="discussion-card"
    // >
    //   <Card
    //     hoverable="true"
    //     style={{ margin: '30px 0px' }}
    //     actions={[
    //       <SettingOutlined key="setting" />,
    //       //! vvv Reformat to flag chip that routes you to
    //       //! vvv  discussion with view by set to "flagged"
    //       <EditOutlined
    //         key="edit"
    //         onClick={() => {
    //           setShowModal(true);
    //         }}
    //       />,
    //       <EllipsisOutlined
    //         key="ellipsis"
    //         onClick={() => props.setFlaggingModalVisibility(true)}
    //       />,
    //     ]}
    //     title={
    //       <Card.Meta
    //         avatar={<Avatar src={props.discussion.profile_picture} />}
    //         title={props.discussion.title}
    //       />
    //     }
    //   >
    //     <p>{props.discussion.description}</p>
    //     <Link to={`${url}/discussion/${props.discussion.id}?view=flagged`}>
    //       <FlagChip flags={props.discussion.flags.length} commentsFlagged="0" />
    //     </Link>
    //     <UserFlaggingModal discussionID={props.discussion.id} />
    //     <FlagManagerModal visible={showModal} setVisible={setShowModal} />
    //   </Card>
    //   <Switch>
    //     <Route
    //       path={`${path}/discussion/:discussionID`}
    //       component={DiscussionDrawer}
    //     ></Route>
    //   </Switch>
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
