import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDirectory, follow, unfollow, fetchUser } from '../../store/actions';
import { Layout, List, Card, Avatar, Button } from 'antd';

const Directory = (props) => {
  const { Header, Content } = Layout;

  useEffect(() => {
    props.fetchUser();
    props.getDirectory();
  }, [props.user.following]);

  const isFollowing = (user_id) => {
    return props.user.following_list.find(
      (item) => item.following_id === user_id
    );
  };

  return (
    <div>
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
          <h2>Directory</h2>
        </Header>
        <Content>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={props.users}
            pagination={{
              onChange: (page) => {},
              pageSize: 6,
            }}
            renderItem={(user) => (
              <List.Item>
                <Card
                  title={
                    <>
                      <Avatar
                        src={user.profile_picture}
                        size="large"
                        style={{ marginRight: '10px' }}
                      />
                      <Link to={`/user/${user.id}`}>{user.display_name}</Link>
                    </>
                  }
                  extra={
                    props.user.id !== user.id && (
                      <>
                        <Link
                          to={`/message/send/${props.user.id}/receive/${user.id}`}
                        >
                          <Button
                            type="primary"
                            style={{ width: '100px', marginRight: '10px' }}
                          >
                            Message
                          </Button>
                        </Link>
                        {isFollowing(user.id) ? (
                          <Button
                            type="primary"
                            style={{ width: '100px' }}
                            onClick={() => {
                              props
                                .unfollow(props.user.id, user.id)
                                .then(() => props.fetchUser());
                            }}
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            style={{ width: '100px' }}
                            onClick={() => {
                              props
                                .follow(props.user.id, user.id)
                                .then(() => props.fetchUser());
                            }}
                          >
                            Follow
                          </Button>
                        )}
                      </>
                    )
                  }
                >
                  {
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>
                        <b style={{ marginRight: '5px' }}>Track:</b>
                        {`${user.track.toUpperCase()}`}
                      </span>
                      <span>
                        <b style={{ marginRight: '5px' }}>Following:</b>
                        {`${user.following}`}
                      </span>
                      <span>
                        {user.github_username ? (
                          <a
                            href={`https://github.com/${user.github_username}`}
                          >
                            <b>Github</b>
                          </a>
                        ) : (
                          <b>Github</b>
                        )}
                      </span>
                    </div>
                  }
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getDirectory,
  follow,
  unfollow,
  fetchUser,
})(Directory);
