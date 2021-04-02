import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  setFlaggingModalVisibility,
  fetchPost,
  setDrawerVisibility,
} from '../store/actions/index';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { List, Popover, Space, Divider } from 'antd';
import { Switch, useRouteMatch, Link } from 'react-router-dom';

import { PrivateRoute } from '../utils/privateRoute';
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
