import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchRecent } from '../store/actions';
import { List, Space, Divider } from 'antd';
import {
  MessageOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
  MoreOutlined,
} from '@ant-design/icons';

import DiscussionDrawer from './DiscussionDrawer';
import { FlagChip } from './FlagChip';

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

const Feed = (props) => {
  const { path, url } = useRouteMatch();

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={props.discussion}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          style={{ background: 'white' }}
          grid={{ column: 4 }}
          actions={[
            <IconText
              icon={ArrowUpOutlined}
              text={item.likes}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text={item.comments}
              key="list-vertical-message"
            />,
          ]}
        >
          <List.Item.Meta
            title={
              <DiscussionHeaderStyles>
                <Link to={`${url}/discussion/${item.id}?view=popular`}>
                  {item.title}
                </Link>
                {/* <MoreOutlined /> */}
                <EllipsisOutlined />
              </DiscussionHeaderStyles>
            }
            description={
              <Space>
                Posted by {item.display_name}
                <Divider type="vertical" />
                {moment(item.created_at).fromNow()}
              </Space>
            }
          />
          {item.description}
          {item.flags && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <FlagChip flags={item.flags.length} />
            </div>
          )}
          <Switch>
            <Route
              path={`${path}/discussion/:discussionID`}
              component={DiscussionDrawer}
            ></Route>
          </Switch>
        </List.Item>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    discussion: state.posts,
  };
};

export default connect(mapStateToProps, { fetchRecent })(Feed);
