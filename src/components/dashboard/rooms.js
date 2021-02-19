import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";
import Room from "./roomCard";
import PostsContainer from "./styles/postsStyle";
import styled from 'styled-components';

const TitleWrapper = styled.div`
    h1 {
        color: white;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
    }
`

const Rooms = (props) => {
  useEffect(() => {
    // ? Default search query passed in
    props.fetchRooms();
  }, []);

  return (
    <TitleWrapper>
        <PostsContainer>
            {console.log(props.rooms)}
            {props.rooms.length > 0 ? (
                props.rooms.map((item, index) => <Room key={index} room={item} />)
            ) : (
                <div className="no-posts-found">
                <p>
                    <i className="fas fa-exclamation"></i>No Rooms found
                </p>
                </div>
            )}
            {/* {props.rooms.length > 0 && (<p className="youve-reached-the-end">You've reached the end!</p>)} */}
        </PostsContainer>
    </TitleWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { fetchRooms })(Rooms);
