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

  return (
    <List.Item
      key={props.discussion.title}
      style={{ background: 'white' }}
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
      ]}
    >
      <List.Item.Meta
        title={
          <DiscussionHeaderStyles>
            <Link to={`${url}/discussion/${props.discussion.id}?view=popular`}>
              {props.discussion.title}
            </Link>
            <Popover
              placement="topRight"
              content={
                <PopoverContent
                  setPopoverVisibility={setPopoverVisibility}
                  discussion={props.discussion}
                />
              }
              trigger="click"
              visible={popoverVisibility}
              onVisibleChange={(visible) => setPopoverVisibility(visible)}
            >
              <EllipsisOutlined />
            </Popover>
          </DiscussionHeaderStyles>
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
      {props.discussion.flags && (
        <Link
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          to={`${url}/discussion/${props.discussion.id}?view=flagged`}
        >
          <FlagChip flags={props.discussion.flags.length} />
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
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  setFlaggingModalVisibility,
  fetchPost,
  setDrawerVisibility,
})(DiscussionCard);
