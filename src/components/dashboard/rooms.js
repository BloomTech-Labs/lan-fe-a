import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions";
import Sidebar from "../common/sidebar";
import Room from "./roomCard";
import PostsContainer from "./styles/postsStyle";
import styled from "styled-components";


const RoomWrapper = styled.div`
  display: flex;
  width: 95%;
  flex-wrap: wrap;
`;

const Rooms = (props) => {
  useEffect(() => {
    // ? Default search query passed in
    props.fetchRooms();
  }, []);

  return (
    <RoomWrapper>
      {/* // <TitleWrapper> */}
        <Sidebar />
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
    </RoomWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { fetchRooms })(Rooms);
