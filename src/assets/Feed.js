import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecent, fetchPostByRoom, fetchRooms } from '../store/actions';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Card, Avatar } from 'antd';

const Feed = (props) => {
  const { id } = useParams();
  const { Header, Footer, Sider, Content } = Layout;

  useEffect(() => {
    if (id) {
      props.fetchPostByRoom(id, 1);
      props.fetchRooms();
    }
  }, []);

  const findRoom = (id) => {
    const currentRoom = props.rooms.filter((r) => r.id === parseInt(id))[0];
    if (currentRoom) {
      return currentRoom;
    } else {
      return {
        room_name: 'ROOM NOT FOUND',
        description: ''
      };
    }
  };

  return (
    <Layout>
      <Header style={{ padding: '0px 0px', background: '#f0f2f5', display: 'flex', justifyContent: 'flex-start', height: 'auto' }}>
        <div style={{ display: 'flex', flexFlow: 'column wrap', alignSelf: 'flex-start'}}>
          <h2 >
            {findRoom(id).room_name}
          </h2>
          <p >
            {findRoom(id).description}
          </p>
        </div>
      </Header>
      <Content>
        {props.posts.map((p) => (
          <Card
            style={{margin: '30px 0px'}}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
            key={p.id}
            title={<Card.Meta
              avatar={<Avatar src={p.profile_picture} />}
              title={p.title}
            />}
          >
            <p>{p.description}</p>
          </Card>
        ))}
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
    posts: state.posts,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  fetchRecent,
  fetchPostByRoom,
  fetchRooms,
})(Feed);
