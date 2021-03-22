import React from 'react';
import { connect } from 'react-redux';
import { retrieveFullSearchResults } from '../store/actions';
import { Link } from 'react-router-dom';
import { Menu, Row, Col, Avatar, Dropdown, Input } from 'antd';
import {
  UserOutlined,
  QuestionOutlined,
  SettingOutlined,
  ShopOutlined,
  FileOutlined,
} from '@ant-design/icons';
import AlumniLogo from '../img/AlumniLogo.svg';

const Navbar = (props) => {
  const handleSearchChange = (e) => {
    if (e.target.value !== '') {
      props.retrieveFullSearchResults(e.target.value);
    }
  };

  return (
    <Row
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Col span={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ width: '60%' }}>
          <Link to='/' >
            <img src={AlumniLogo} width="100%" />
          </Link>
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
              {props.searchResults.posts.map((p) => (
                <Menu.Item icon={<FileOutlined />} key={p.id}>
                  <Link to={`post/${p.id}`}>{p.title}</Link>
                </Menu.Item>
              ))}
              {props.searchResults.users.map((u) => (
                <Menu.Item icon={<UserOutlined />} key={u.id}>
                  <Link to={`user/${u.id}`}>{u.display_name}</Link>
                </Menu.Item>
              ))}
              {props.searchResults.rooms.map((r) => (
                <Menu.Item icon={<ShopOutlined />} key={r.id}>
                  <Link to={`room/${r.id}/page/1`}>{r.room_name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Input.Search
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
              <Menu.Item icon={<QuestionOutlined />}>
                <Link to="/faq">FAQ</Link>
              </Menu.Item>
              <Menu.Item icon={<UserOutlined />}>
                <Link to={`/user/${props.user.id}`}>My Profile</Link>
              </Menu.Item>
              <Menu.Item icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar src={props.user.profilePicture} size="large" />
        </Dropdown>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.mainSearchResults,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  retrieveFullSearchResults,
})(Navbar);
