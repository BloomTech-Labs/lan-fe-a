import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../store/actions';
import SettingsContent from './SettingsContent';
import { Layout, Badge, Button, Tabs, Card } from 'antd';

const ProfileContent = (props) => {
  const { Header, Content } = Layout;
  const { TabPane } = Tabs;
  const userID = props.match.params.id;

  const [actKey, setActKey] = useState('Posts');
  useEffect(() => {
    props.fetchUserProfile(userID);
  }, [props]);

  const handleEditProfileButton = () => {
    setActKey('Settings');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
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
          {props.user.id === props.match.params.id && <h2>My Profile</h2>}
        </div>
      </Header>
      <Content>
        {Object.keys(props.currentUser).length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={props.currentUser.profile_picture}
                width="100px"
                height="100px"
                style={{ borderRadius: '50%', marginRight: '15px' }}
              />
              <div>
                <Badge
                  count={props.currentUser.track.toUpperCase()}
                  offset={[25, -10]}
                >
                  <h3>{props.currentUser.display_name}</h3>
                </Badge>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {props.currentUser.posts.length !== 1 ? (
                    <p style={{ marginRight: '15px' }}>
                      <b>{props.currentUser.posts.length}</b> posts
                    </p>
                  ) : (
                    <p style={{ marginRight: '15px' }}>
                      <b>1</b> post
                    </p>
                  )}
                  {props.currentUser.comments.length !== 1 ? (
                    <p>
                      <b>{props.currentUser.comments.length}</b> comments
                    </p>
                  ) : (
                    <p>
                      <b>1</b> comment
                    </p>
                  )}
                </div>
                {props.user.id === props.match.params.id && (
                  <Button type="primary" onClick={handleEditProfileButton}>
                    Edit Profile
                  </Button>
                )}
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
              {props.user.id === props.match.params.id && (
                <TabPane tab="Settings" key="Settings">
                  <SettingsContent actKey={actKey} />
                </TabPane>
              )}
            </Tabs>
          </>
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
