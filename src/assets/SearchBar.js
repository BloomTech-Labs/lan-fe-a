import React from 'react';
import { connect } from 'react-redux';
import { retrieveFullSearchResults } from '../store/actions';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Input } from 'antd';
import { UserOutlined, ShopOutlined, FileOutlined } from '@ant-design/icons';

const SearchBar = (props) => {
  const handleSearchChange = (e) => {
    if (e.target.value !== '') {
      props.retrieveFullSearchResults(e.target.value);
    }
  };

  return (
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
})(SearchBar);
