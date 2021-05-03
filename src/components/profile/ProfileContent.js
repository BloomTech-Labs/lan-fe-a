import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchUser,
  fetchUserProfile,
  follow,
  unfollow,
} from '../../store/actions';
import SettingsContent from './SettingsContent';
import { Layout, Badge, Button, Tabs, Card, List, Avatar, Space } from 'antd';
import GitHubCalendar from 'react-github-calendar';

const ProfileContent = (props) => {
  const { Header, Content } = Layout;
  const { TabPane } = Tabs;
  const userID = props.match.params.id;

  const [actKey, setActKey] = useState('Posts');

  const isFollowing = (user_id) => {
    return props.user.following_list.find(
      (item) => item.following_id === user_id
    );
  };

  useEffect(() => {
    props.fetchUserProfile(userID);
  }, [
    userID,
    props.user.displayName,
    props.user.profilePicture,
    props.user.track,
    props.user.gitHubUsername,
    props.user.following,
    props.user.userBio,
    props.user.mentor,
    props.user.mentee,
  ]);

  const handleEditProfileButton = () => {
    setActKey('Settings');
  };

  const handleFollowing = () => {};

  return (
    <Layout className="profile-container">
      {/* <Header>
      </Header> */}
      <Content>
        {Object.keys(props.currentUser).length > 0 && (
          <div className="profile-content">
            <div className="profile-header">
              <img src={props.currentUser.profile_picture} />
              <div className="user-info-and-buttons">
                <div className="user-name-and-badge">
                  <h3 id="user-name">{props.currentUser.display_name}</h3>
                  <Badge
                    count={props.currentUser.track.toUpperCase()}
                    //TODO get this working with the ProfileContent.less file
                    // offset={[25, -10]}
                    style={{ backgroundColor: 'grey' }}
                  ></Badge>
                </div>
                <div className="posts-and-comments">
                  {props.currentUser.posts.length !== 1 ? (
                    <p className="posts-and-comments-font">
                      <b>{props.currentUser.posts.length}</b> posts
                    </p>
                  ) : (
                    <p className="posts-and-comments-font">
                      <b>1</b> post
                    </p>
                  )}
                  {props.currentUser.comments.length !== 1 ? (
                    <p className="posts-and-comments-font">
                      <b>{props.currentUser.comments.length}</b> comments
                    </p>
                  ) : (
                    <p className="posts-and-comments-font">
                      <b>1</b> comment
                    </p>
                  )}
                </div>
                <div>
                  {props.currentUser.following !== 1 ? (
                    <p className="posts-and-comments-font">
                      <b>{props.currentUser.following}</b> following
                    </p>
                  ) : (
                    <p className="posts-and-comments-font">
                      <b>1</b> following
                    </p>
                  )}
                </div>
                <div>
                  <p id="bio-font">{props.currentUser.user_bio}</p>
                </div>
                <div className="button-container">
                  {props.user.id === props.match.params.id && (
                    <Button type="primary" onClick={handleEditProfileButton}>
                      Edit Profile
                    </Button>
                  )}
                  <div>
                    {props.user.id != props.match.params.id && (
                      <div className="button-container">
                        <div id="follow-button">
                          {isFollowing(props.currentUser.id) ? (
                            <Button
                              type="primary"
                              onClick={() => {
                                props
                                  .unfollow(props.user.id, props.currentUser.id)
                                  .then(() => props.fetchUser());
                              }}
                            >
                              Unfollow
                            </Button>
                          ) : (
                            <Button
                              type="primary"
                              onClick={() => {
                                props
                                  .follow(props.user.id, props.currentUser.id)
                                  .then(() => props.fetchUser());
                              }}
                            >
                              Follow
                            </Button>
                          )}
                        </div>
                        <div>
                          <Link
                            to={`/message/send/${props.user.id}/receive/${props.currentUser.id}`}
                          >
                            <Button type="primary">Message</Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Tabs
              defaultActiveKey="Posts"
              activeKey={actKey}
              onChange={(key) => setActKey(key)}
            >
              <TabPane tab="Posts" key="Posts">
                {props.currentUser.posts.map((item, index) => (
                  <Card
                    size="small"
                    key={index}
                    onClick={() => props.history.push(`/discussion/${item.id}`)}
                    style={{
                      width: 500,
                      cursor: 'pointer',
                      margin: '1%',
                    }}
                  >
                    <p>{item.title}</p>
                    <p style={{ fontSize: '12px', marginBottom: '0' }}>
                      {moment(item.created_at).fromNow()}
                    </p>
                  </Card>
                ))}
              </TabPane>
              <TabPane tab="Comments" key="Comments">
                {props.currentUser.comments.map((item, index) => (
                  <Card
                    size="small"
                    key={index}
                    onClick={() => props.history.push(`/discussion/${item.id}`)}
                    style={{ width: 500, cursor: 'pointer' }}
                  >
                    <p>{item.comment}</p>
                    <p style={{ fontSize: '12px', marginBottom: '0' }}>
                      {moment(item.created_at).fromNow()}
                    </p>
                  </Card>
                ))}
              </TabPane>
              <TabPane tab="Following" key="Following">
                <List
                  style={{ width: '500px' }}
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {},
                    pageSize: 5,
                  }}
                  dataSource={props.currentUser.following_list}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      actions=""
                      extra={
                        props.user.id !== item.following_id &&
                        (isFollowing(item.following_id) ? (
                          <Button
                            type="primary"
                            style={{ width: '125px' }}
                            onClick={() => {
                              props
                                .unfollow(props.user.id, item.following_id)
                                .then(() => props.fetchUser());
                            }}
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            style={{ width: '125px' }}
                            onClick={() => {
                              props
                                .follow(props.user.id, item.following_id)
                                .then(() => props.fetchUser());
                            }}
                          >
                            Follow
                          </Button>
                        ))
                      }
                      style={{ backgroundColor: 'white' }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src={item.profile_picture} size="large" />
                        }
                        title={
                          <Space>
                            <Link to={`/user/${item.following_id}`}>
                              {item.display_name}
                            </Link>
                          </Space>
                        }
                        description={`following: ${item.following}`}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Rooms" key="Rooms">
                <Card>
                  <p>Rooms coming soon</p>
                </Card>
              </TabPane>
              <TabPane tab="Github" key="Github">
                {props.currentUser.github_username == null || props.currentUser.github_username == "" ? (
                  <p>No Github info</p>
                ) : (
                <div>
                  <h3>GitHub Username: {props.currentUser.github_username}</h3>
                  <GitHubCalendar
                    username={props.currentUser.github_username}
                  />
                </div>
                )}
              </TabPane>
              {props.user.id === props.match.params.id && (
                <TabPane tab="Settings" key="Settings">
                  <SettingsContent actKey={actKey} />
                </TabPane>
              )}
            </Tabs>
          </div>
        )}
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentUser: state.currentUser,
    following: state.following,
  };
};

export default connect(mapStateToProps, {
  fetchUserProfile,
  fetchUser,
  follow,
  unfollow,
})(ProfileContent);
