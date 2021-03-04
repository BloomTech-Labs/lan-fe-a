import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  archiveComment,
  resolveComment,
  fetchFlaggedComments,
} from '../../store/actions';
import { Link } from 'react-router-dom';

const ModCmtStyledRoom = styled.div`
  padding: 2%;
  background-color: #141414;
  margin: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 12px;
  .not-editable {
    display: flex;
    flex-direction: column;
    p {
      font-size: 1.3rem;
      font-weight: 500;
      color: whitesmoke;
    }
    i {
      margin: 0.8% 0;
      padding: 0 0.3%;
    }
    a {
      text-decoration: none;
      color: #6495ed;
      font-style: italic;
      font-weight: 500;
      font-size: 1.2rem;
      margin: 1% 0;
      transition: 0.25s;
      :hover {
        font-size: 1.3rem;
      }
    }
    .mod-cmt-button-wrapper {
      display: flex;
      justify-content: flex-end;
      button {
        width: 9%;
        margin-top: 1.5%;
        margin-right: 2%;
        padding: 8px 12px;
        box-shadow: 2px 2px 8px #212529;
        border: 1px solid #808080;
        border-radius: 5px;
        font-family: 'Nunito', sans-serif;
        font-size: 0.9rem;
        color: #ffffff;
        cursor: pointer;
        transition: 0.25s;
        :first-child {
          background-color: #f9fcff;
          background-image: linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%);
          color: black;
          font-weight: 700;
        }
        :last-child {
          background: linear-gradient(to right, #141414, #212121, #282828);
          font-weight: 500;
        }
        :hover {
          opacity: 0.5;
        }
      }
    }
  }
  h4 {
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const SingleFlaggedComment = (props) => {
  const { comment } = props;

  const handleResolveComment = (id) => {
    props
      .resolveComment(id)
      .then(() => {
        props.fetchFlaggedComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleArchiveComment = (id) => {
    props
      .archiveComment(id)
      .then(() => {
        props.fetchFlaggedComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModCmtStyledRoom>
      <div className="not-editable">
        <p>
          <i class="far fa-comments"></i> {comment.comment}
        </p>
        <Link to={`/post/${comment.post_id}`}>
          <i class="fas fa-link"></i>
          Attached Post
        </Link>
        <div className="mod-cmt-button-wrapper">
          <button onClick={() => handleResolveComment(comment.id)}>Keep</button>
          <button onClick={() => handleArchiveComment(comment.id)}>
            Delete
          </button>
        </div>
      </div>
    </ModCmtStyledRoom>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  archiveComment,
  resolveComment,
  fetchFlaggedComments,
})(SingleFlaggedComment);
