import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostByRoom,
  fetchPostsAndFlagsByRoom,
} from '../store/actions/index';
import moment from 'moment';
import { List, Space, Divider, Select } from 'antd';

import DiscussionCard from './DiscussionCard';

const Feed = (props) => {
  const [popoverVisibility, setPopoverVisibility] = useState(false);
  const { roomID } = useParams();

  useEffect(() => {
    if (roomID) {
      if (props.user.role_id < 2) props.fetchPostByRoom(roomID, 1);
      else props.fetchPostsAndFlagsByRoom(roomID, 1);
    }
  }, []);

  return (
    <>
      <Divider orientation="right">
        {`View by: `}
        <Select defaultValue="popular">
          <Select.Option value="popular">Popular</Select.Option>
          <Select.Option value="recent">Recent</Select.Option>
          <Select.Option value="Popular">Flagged</Select.Option>
        </Select>
      </Divider>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={props.discussion}
        renderItem={(item) => {
          return (
            <>
              <DiscussionCard item={item} />
              <br />
            </>
          );
        }}
        // <List.Item
        //   key={item.title}
        //   style={{ background: 'white' }}
        //   grid={{ column: 4 }}
        //   actions={[
        //     <IconText
        //       icon={ArrowUpOutlined}
        //       text={item.likes}
        //       key="list-vertical-like-o"
        //     />,
        //     <IconText
        //       icon={MessageOutlined}
        //       text={item.comments}
        //       key="list-vertical-message"
        //     />,
        //   ]}
        // >
        //   <List.Item.Meta
        //     title={
        //       <DiscussionHeaderStyles>
        //         <Link to={`${url}/discussion/${item.id}?view=popular`}>
        //           {item.title}
        //         </Link>
        //         <Popover
        //           content={
        //             <a onClick={() => setPopoverVisibility(false)}>Close</a>
        //           }
        //           trigger="click"
        //           visible={popoverVisibility}
        //           onVisibleChange={(visible) => setPopoverVisibility(visible)}
        //         >
        //           {/* <MoreOutlined /> */}
        //           <EllipsisOutlined />
        //         </Popover>
        //       </DiscussionHeaderStyles>
        //     }
        //     description={
        //       <Space>
        //         Posted by {item.display_name}
        //         <Divider type="vertical" />
        //         {moment(item.created_at).fromNow()}
        //       </Space>
        //     }
        //   />
        //   {item.description}
        //   {item.flags && (
        //     <div
        //       style={{
        //         width: '100%',
        //         display: 'flex',
        //         justifyContent: 'flex-end',
        //       }}
        //     >
        //       <FlagChip flags={item.flags.length} />
        //     </div>
        //   )}
        //   <Switch>
        //     <Route
        //       path={`${path}/discussion/:discussionID`}
        //       component={DiscussionDrawer}
        //     ></Route>
        //   </Switch>
        // </List.Item>
        // )}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    discussion: state.posts,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchPostByRoom,
  fetchPostsAndFlagsByRoom,
})(Feed);
