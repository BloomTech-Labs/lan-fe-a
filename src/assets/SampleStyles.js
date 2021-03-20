import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch
} from '../store/actions';
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
  QuestionOutlined,
  SettingOutlined,
  HeartOutlined,
  ShopOutlined,
  FileOutlined
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

  const handleSearchChange = (e) => {
    if (e.target.value !== '') {
      props.retrieveFullSearchResults(e.target.value);
    } else {
      setSearch('');
    }
  };

  return (
    <Layout>
      <Header className="header" style={{ width: '100%' }}>
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
            <Dropdown
              placement="bottomCenter"
              trigger={['click']}
              overlay={
                <Menu>
                  {props.searchResults.posts.map(p => (
                    <Item icon={<FileOutlined />} key={p.id}>
                      <Link to={`post/${p.id}`}>
                        {p.title}                      
                      </Link>
                    </Item>
                  ))}
                  {props.searchResults.users.map(u => (
                    <Item icon={<UserOutlined />} key={u.id}>
                      <Link to={`user/${u.id}`} >
                        {u.display_name}  
                      </Link>
                    </Item>
                  ))}
                  {props.searchResults.rooms.map(r => (
                    <Item icon={<ShopOutlined />} key={r.id}>
                      <Link to={`room/${r.id}/page/1`}>
                        {r.room_name}  
                      </Link>
                    </Item>
                  ))}
                </Menu>
              }
            >
              <Search
                placeholder="input search text"
                onChange={handleSearchChange}
                onSearch={(e) => console.log(e)}
                enterButton
              />
            </Dropdown>
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
                  <Item icon={<QuestionOutlined />}>
                    <Link to="/faq">FAQ</Link>
                  </Item>
                  <Item icon={<UserOutlined />}>
                    <Link to={`/user/${props.user.id}`}>My Profile</Link>
                  </Item>
                  <Item icon={<SettingOutlined />}>
                    <Link to="/settings">Settings</Link>
                  </Item>
                </Menu>
              }
            >
              <Avatar src={props.user.profilePicture} size="large" />
            </Dropdown>
          </Col>
        </Row>
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
  console.log(state);
  return {
    user: state.user,
    rooms: state.rooms,
    posts: state.posts,
    searchResults: state.mainSearchResults,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  fetchRecent,
  fetchUser,
  retrieveFullSearchResults,
  setSearch
})(SampleStyles);
