import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../store/actions';
import SettingsContent from './SettingsContent';
import { Layout, Badge, Button, Tabs, Card } from 'antd';
import GitHubCalendar from 'react-github-calendar';

const ProfileContent = (props) => {
  console.log(props);
  const { Header, Content } = Layout;
  const { TabPane } = Tabs;
  const userID = props.match.params.id;

  const [actKey, setActKey] = useState('Posts');
  useEffect(() => {
    props.fetchUserProfile(userID);
  }, [
    userID,
    props.user.displayName,
    props.user.profilePicture,
    props.user.track,
    props.user.gitHubUsername,
  ]);

  const handleEditProfileButton = () => {
    setActKey('Settings');
  };

  return (
    <Layout
      // style={{ minHeight: '100vh' }}
      className="profile-container"
    >
      {/* <Header
        style={{
          padding: '0px 0px',
          background: '#f0f2f5',
          display: 'flex',
          justifyContent: 'flex-start',
          height: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignSelf: 'flex-start',
          }}
        >
          {/* Leaving this header in case we want to add it back in */}
      {/* <h2>{props.currentUser.display_name}</h2> */}
      {/* {props.user.id === props.match.params.id && <h2>My Profile</h2>}
        </div>
      </Header> */}
      <Content>
        {Object.keys(props.currentUser).length > 0 && (
          <div className="profile-content">
            <div
              className="profile-header"
              // style={{
              //   display: 'flex',
              //   alignItems: 'center',
              //   border: '1px solid',
              // }}
            >
              <img
                src={props.currentUser.profile_picture}
                width="100px"
                height="100px"
                style={{ borderRadius: '50%', marginRight: '15px' }}
              />
              <div className="user-info-and-buttons">
                <div className="user-name-and-badge">
                  <h3 id="user-name">{props.currentUser.display_name}</h3>
                  <Badge
                    count={props.currentUser.track.toUpperCase()}
                    // offset={[25, -10]}
                    // style={{ backgroundColor: 'grey' }}
                  ></Badge>
                </div>
                <div
                  className="posts-and-comments"
                  // style={{ display: 'flex', justifyContent: 'space-between' }}
                >
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
                <p id="bio-font">Bio Coming Soon</p>
                <div className="button-container">
                  {props.user.id === props.match.params.id && (
                    <Button type="primary" onClick={handleEditProfileButton}>
                      Edit Profile
                    </Button>
                  )}

                  {props.user.id != props.match.params.id && (
                    // <div style={{ display: 'flex' }}>
                    <>
                      <div id='follow-button'>
                        <Button type="primary">Follow</Button>
                      </div>
                      <div>
                        <Link
                          to={`/message/send/${props.user.id}/receive/${props.currentUser.id}`}
                        >
                          <Button type="primary">Message</Button>
                        </Link>
                      </div>
                    </>
                    // </div>
                  )}
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
                    title={
                      <p style={{ fontSize: '12px', marginBottom: '0' }}>
                        {moment(item.created_at).fromNow()}
                      </p>
                    }
                    style={{ width: 500 }}
                  >
                    <p onClick={() => props.history.push(`/post/${item.id}`)}>
                      {item.title}
                    </p>
                  </Card>
                ))}
              </TabPane>
              <TabPane tab="Comments" key="Comments">
                {props.currentUser.comments.map((item, index) => (
                  <Card
                    size="small"
                    key={index}
                    title={
                      <p style={{ fontSize: '12px', marginBottom: '0' }}>
                        {moment(item.created_at).fromNow()}
                      </p>
                    }
                    style={{ width: 500 }}
                  >
                    <p
                      onClick={() =>
                        props.history.push(`/post/${item.post_id}`)
                      }
                    >
                      {item.comment}
                    </p>
                  </Card>
                ))}
              </TabPane>

              <TabPane tab="Following" key="Following">
                <Card
                  size="small"
                  title={<p> Following Cards Coming Soon</p>}
                  style={{ width: 500 }}
                ></Card>
              </TabPane>
              <TabPane tab="Rooms" key="Rooms">
                <Card>
                  <p>Rooms coming soon</p>
                </Card>
              </TabPane>
              <TabPane tab="Github" key="Github">
                {props.currentUser.github_username == null ? (
                  <p>No Github info</p>
                ) : (
                  <GitHubCalendar
                    username={props.currentUser.github_username}
                  />
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
  };
};

export default connect(mapStateToProps, {
  fetchUserProfile,
})(ProfileContent);
