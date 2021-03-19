import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRooms, fetchRecent, fetchUser } from '../store/actions';
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Row,
  Col,
  Avatar,
  Dropdown,
} from 'antd';
import {
  UserOutlined,
  ShopFilled,
  LaptopOutlined,
  HeartOutlined,
  ShopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import AlumniLogo from '../img/AlumniLogo.svg';

const SampleStyles = (props) => {
  const { SubMenu, Item } = Menu;
  const { Header, Content, Sider } = Layout;
  const { Search } = Input;

  useEffect(() => {
    props.fetchRooms();
    // props.fetchRecent(); // This is throwing an internal server error
    if (Object.keys(props.user).length === 0) {
      props.fetchUser();
    }
  }, []);

  return (
    <Layout>
      <Header className="header" style={{ width: '100%' }}>
        {/* <div className="logo" /> */}
        <Row
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Col
            span={6}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div
              style={{ width: '60%' }}
              onClick={() => {
                props.history.push('/');
              }}
            >
              <img src={AlumniLogo} width="100%" />
            </div>
          </Col>
          <Col
            span={6}
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
            }}
          >
            <Search
              placeholder="input search text"
              onSearch={(e) => console.log('search implementation pending')}
              enterButton
            />
          </Col>
          <Col
            span={6}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Dropdown
              placement="bottomRight"
              arrow
              trigger={['click']}
              overlay={
                <Menu>
                  <Item>
                    <Link to='/faq'>FAQ</Link>
                  </Item>
                  <Item>
                    <Link to={`/user/${props.user.id}`}>My Profile</Link>
                  </Item>
                  <Item>
                    <Link to='/settings'>Settings</Link>
                  </Item>
                </Menu>
              }
            >
              <Avatar src={props.user.profilePicture} size="large" />
            </Dropdown>
          </Col>
        </Row>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Item key="1">nav 1</Item>
          <Item key="2">
            <Search placeholder="input search text" onSearch={e => console.log(e.value)} enterButton />
          </Item>
          <Item key="3">nav 3</Item>
        </Menu> */}
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<HeartOutlined />} title="My Rooms">
              <Item key="1">option1</Item>
              <Item key="2">option2</Item>
              <Item key="3">option3</Item>
              <Item key="4">option4</Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<ShopOutlined />} title="Rooms">
              {props.rooms.map((room, index) => {
                return (
                  <Item key={index}>
                    <Link key={index} to={`room/${room.id}/page/1`}>
                      {room.room_name}
                    </Link>
                  </Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { fetchRooms, fetchRecent, fetchUser })(
  SampleStyles
);
