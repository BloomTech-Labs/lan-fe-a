import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchRooms,
  fetchUsers,
  deleteRoom,
  createRoom,
} from '../store/actions';
import SingleUserContent from './SingleUserContent';
import { Layout, Badge, Button, Tabs, Card } from 'antd';

const AdminContent = (props) => {
  const { Header, Content } = Layout;

  const { TabPane } = Tabs;

  useEffect(() => {
    props.fetchUsers();
    props.fetchRooms();
  }, []);

  console.log(props.rooms);

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
          <h2>Admin Settings</h2>
        </div>
      </Header>
      <Content>
        <Tabs>
          <TabPane key="Users" tab="Users">
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'flex-start',
              }}
            >
              {props.user.role_id === 3 &&
                props.users.map((item) => {
                  return <SingleUserContent key={item.id} user={item} />;
                })}
            </div>
          </TabPane>
          <TabPane key="Rooms" tab="Rooms">
            {props.user.role_id === 3 &&
              props.rooms.map((item) => {
                return (
                  <div key={item.id}>
                    <h4>{item.room_name}</h4>
                    <p>{item.description}</p>
                  </div>
                );
              })}
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  fetchUsers,
  deleteRoom,
  createRoom,
})(AdminContent);
