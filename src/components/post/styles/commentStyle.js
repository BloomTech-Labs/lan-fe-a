import styled from 'styled-components';

const CommentContainer = styled.div`
  margin-bottom: 52px;
  display: flex;
  padding: 2%;
  // that
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  img {
    margin-right: 12px;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.25s;

    :hover {
      opacity: 0.5;
    }
  }

  .more-options {
    color: #ffffff;
    height: 3vh;
    padding: 5px;
    display: flex;
    align-items: center;
    transition: 0.25s;
    // that
    position: absolute;
    right: 10px;
    top: 0;
    :hover {
      opacity: 0.5;
    }
  }

  .commentdropdown {
    width: 200px;
    background: #242323;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    right: 10px;
    z-index: 10;
  }

  .right-section {
    width: 90%;
    padding-bottom: 1.5%;
    border-bottom: 1.5px solid grey;
    font-weight: 500;
    .user {
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      font-weight: 500;
      .display-name {
        margin-right: 8px;
        font-size: 0.875rem;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
        transition: 0.25s;
        text-transform: capitalize;
        font-size: 1.1rem;
        font-weight: 700;
        :hover {
          opacity: 0.5;
        }
      }

      .timestamp {
        font-size: 0.8rem;
        font-weight: 500;
        color: #ffffff;
      }
    }

    .answer {
      margin-bottom: 8px;
      font-size: 1rem;
      font-weight: 500;
      // color: #ffffff;
      color: #e0dcdc;
    }

    .likes {
      font-size: 0.875rem;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;

      i {
        margin-right: 4px;
        cursor: pointer;
        transition: 0.1s;

        :active {
          transform: scale(1.25);
        }
      }

      .white {
        color: #ffffff;
      }

      .blue {
        color: #0099ff;
      }
    }
  }
`;

export default CommentContainer;
