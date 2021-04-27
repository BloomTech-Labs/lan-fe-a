import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getBugs,
  editBug,
  resolveBug,
  openBug,
  fetchUser,
  deleteBug,
} from '../../store/actions';
import { Layout, List, Image, Avatar, Button, Tabs, Badge, Card } from 'antd';

const BugTracker = (props) => {
  const { Header, Content } = Layout;
  const { TabPane } = Tabs;

  useEffect(() => {
    props.getBugs();
  }, []);

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
          <h2>Bug Tracker</h2>
        </Header>
        <Content>
          <Tabs defaultActiveKey="Open" onChange={(key) => {}}>
            <TabPane
              tab={
                <Badge
                  count={props.bugs.filter((bug) => !bug.resolved).length}
                  offset={[10, -5]}
                >
                  Open
                </Badge>
              }
              key="Open"
            >
              <List
                itemLayout="vertical"
                size="large"
                dataSource={props.bugs.filter((bug) => !bug.resolved)}
                pagination={{
                  onChange: (page) => {},
                  pageSize: 10,
                }}
                renderItem={(bug) => (
                  <List.Item
                    key={bug.id}
                    actions={[
                      <>
                        <span style={{ marginRight: '10px' }}>
                          Reported by:
                        </span>
                        <Avatar
                          src={bug.profile_picture}
                          size="small"
                          style={{ marginRight: '10px' }}
                        />

                        <Link to={`/user/${bug.user_id}`}>
                          {bug.display_name}
                        </Link>
                      </>,
                    ]}
                  >
                    <Card
                      title={bug.title}
                      extra={
                        <Button
                          type="primary"
                          onClick={() => {
                            props
                              .resolveBug(bug.id)
                              .then(() => props.getBugs());
                          }}
                        >
                          Resolve
                        </Button>
                      }
                    >
                      {
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ marginRight: '20px' }}>
                            {bug.description}
                          </span>
                          <span>
                            {bug.photo_url !== null && (
                              <Image width={300} src={bug.photo_url} />
                            )}
                          </span>
                        </div>
                      }
                    </Card>
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane
              tab={
                <Badge
                  count={props.bugs.filter((bug) => bug.resolved).length}
                  offset={[10, -5]}
                >
                  Resolved
                </Badge>
              }
              key="Resolved"
            >
              <List
                itemLayout="vertical"
                size="large"
                dataSource={props.bugs.filter((bug) => bug.resolved)}
                pagination={{
                  onChange: (page) => {},
                  pageSize: 10,
                }}
                renderItem={(bug) => (
                  <List.Item
                    key={bug.id}
                    actions={[
                      <>
                        <span style={{ marginRight: '10px' }}>
                          Reported by:
                        </span>
                        <Avatar
                          src={bug.profile_picture}
                          size="small"
                          style={{ marginRight: '10px' }}
                        />

                        <Link to={`/user/${bug.user_id}`}>
                          {bug.display_name}
                        </Link>
                      </>,
                    ]}
                  >
                    <Card
                      title={bug.title}
                      extra={
                        <>
                          <Button
                            type="primary"
                            onClick={() => {
                              props.openBug(bug.id).then(() => props.getBugs());
                            }}
                          >
                            Open
                          </Button>
                          <Button
                            style={{ marginLeft: '10px' }}
                            type="danger"
                            onClick={() =>
                              props
                                .deleteBug(bug.id)
                                .then(() => props.getBugs())
                            }
                          >
                            Delete
                          </Button>
                        </>
                      }
                    >
                      {
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ marginRight: '20px' }}>
                            {bug.description}
                          </span>
                          <span>
                            {bug.photo_url !== null && (
                              <Image width={300} src={bug.photo_url} />
                            )}
                          </span>
                        </div>
                      }
                    </Card>
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    bugs: state.bugs,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getBugs,
  editBug,
  resolveBug,
  deleteBug,
  openBug,
  fetchUser,
})(BugTracker);
