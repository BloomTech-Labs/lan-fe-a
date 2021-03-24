import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { retrieveFullSearchResults } from '../../store/actions';
import Header from '../common/Header';
import PostResults from './PostResults';
import CommentResults from './CommentResults';
import UserResults from './UserResults';
import RoomResults from './RoomResults';

const StyledSearchResults = styled.div`
  color: white;
  margin: 5%;
`;

const FullSearchResults = (props) => {
  useEffect(() => {
    if (props.search !== '') {
      props.retrieveFullSearchResults(props.search);
    }
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

export default connect(mapStateToProps, { retrieveFullSearchResults })(
  FullSearchResults
);
