import React from 'react';
import { connect } from 'react-redux';
import { retrieveFullSearchResults } from '../../../store/actions';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import LambdaLogo from '../../../img/LambdaLogo';
import ProfileIcon from './ProfileIcon';
import SearchBar from './SearchBar';

const Navbar = (props) => {
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
        <div style={{ width: 150, minWidth: 150 }}>
          <Link to="/">
            <LambdaLogo
              fillOpacity={0.87}
              fill={'black'}
              style={{ border: 'thin black solid' }}
            />
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
        <SearchBar />
      </Col>
      <Col
        span={6}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <ProfileIcon />
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
