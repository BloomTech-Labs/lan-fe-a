import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { retrieveFullSearchResults } from '../../actions';
import Header from '../common/header';
import PostResults from './postResults';
import CommentResults from './commentResults';
import UserResults from './userResults';
import RoomResults from './roomResults';

const StyledSearchResults = styled.div`
  color: white;
  margin: 5%;
`;

const FullSearchResults = (props) => {
  useEffect(() => {
    props.retrieveFullSearchResults(props.search);
  }, [props.search]);
  return (
    <StyledSearchResults>
      <Header history={props.history} />
      <PostResults posts={props.mainSearchResults.posts} />
      <CommentResults comments={props.mainSearchResults.comments} />
      <UserResults users={props.mainSearchResults.users} />
      <RoomResults rooms={props.mainSearchResults.rooms} />
    </StyledSearchResults>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    search: state.search,
    mainSearchResults: state.mainSearchResults,
  };
};

export default connect(mapStateToProps, { retrieveFullSearchResults })(FullSearchResults);
