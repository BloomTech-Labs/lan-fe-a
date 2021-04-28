import React from 'react';
import { connect } from 'react-redux';
import {
  retrieveFullSearchResults,
  fetchPostByRoom,
  setDrawerVisibility,
} from '../../../store/actions';
import { Link, useRouteMatch, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Input } from 'antd';
import { UserOutlined, ShopOutlined, FileOutlined } from '@ant-design/icons';

const SearchBar = ({ history, searchResults, fetchPostByRoom, setDrawerVisibility, retrieveFullSearchResults }) => {
  const { url } = useRouteMatch();

  const handleSearch = query => {
    if (query) {
      retrieveFullSearchResults(query);
      history.push(`/search/${query}`);
    }
  }
 
  const handleSearchChange = (e) => {
    if (e.target.value !== '') {
      retrieveFullSearchResults(e.target.value);
    }
  };

  return (
    <Dropdown
      placement="bottomCenter"
      trigger={['click']}
      overlay={
        <Menu>
          {searchResults.posts.map((p) => (
            <Menu.Item icon={<FileOutlined />} key={`${p.title}-${p.id}`}>
              <Link to={`post/${p.id}`}>{p.title}</Link>
            </Menu.Item>
          ))}
          {searchResults.users.map((u) => (
            <Menu.Item
              icon={<UserOutlined />}
              key={`${u.display_name}-${u.id}`}
            >
              <Link to={`user/${u.id}`}>{u.display_name}</Link>
            </Menu.Item>
          ))}
          {searchResults.rooms.map((r) => (
            <Menu.Item
              icon={<ShopOutlined />}
              key={`${r.display_name}-${r.id}`}
            >
              <Link
                to={`${url}/room/${r.id}`}
                onClick={() => {
                  fetchPostByRoom(r.id, 1);
                  setDrawerVisibility(true);
                }}
              >
                {r.room_name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Input.Search
        placeholder="input search text"
        onChange={handleSearchChange}
        onSearch={query => handleSearch(query)}
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
  fetchPostByRoom,
  setDrawerVisibility,
})(withRouter(SearchBar));
