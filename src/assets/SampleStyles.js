import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRooms } from '../store/actions';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  ShopFilled,
  LaptopOutlined,
  HeartOutlined,
  ShopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';



const SampleStyles = (props) => {
  const { SubMenu, Item } = Menu;
  const { Header, Content, Sider } = Layout;

  useEffect(() => {
    props.fetchRooms();
    console.log(props);
  }, []);

  return (
    <Layout>
      <Header className="header">
        {/* <div className="logo" /> */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Item key="1">nav 1</Item>
          <Item key="2">nav 2</Item>
          <Item key="3">nav 3</Item>
        </Menu>
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
              {/* <Item key="6">option6</Item>
              <Item key="7">option7</Item>
              <Item key="8">option8</Item> */}
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
    rooms: state.rooms
  };
};


export default connect(mapStateToProps, { fetchRooms })(SampleStyles);
