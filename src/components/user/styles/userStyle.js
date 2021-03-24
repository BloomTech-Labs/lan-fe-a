import styled from 'styled-components';

const UserContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 32px;
  margin-bottom: 64px;

  .user {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    img {
      margin-right: 16px;
      height: 64px;
      width: 64px;
      border-radius: 50%;
    }

    .information {
      display: flex;
      flex-direction: column;

      .left-section {
        .display-name-and-track {
          margin-bottom: 4px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .display-name {
            margin-bottom: 3px;
            font-size: 1.25rem;
            font-weight: 600;
            color: #ffffff;
          }

          .track {
            padding: 1px 2px;
            background: linear-gradient(to right, #0084ff, #0099ff);
            border: none;
            border-radius: 3px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.75rem;
            font-weight: 700;
            color: #ffffff;
          }
        }

        .statistics {
          display: flex;

          p {
            margin-right: 16px;
            font-size: 0.875rem;
            font-weight: 600;
            color: #ffffff;

            :last-child {
              margin-right: 0;
            }
          }
        }
      }

      button {
        padding: 10px 24px;
        margin-top: 12px;
        background: linear-gradient(to right, #0084ff, #0099ff);
        border: none;
        border-radius: 3px;
        font-family: 'Nunito', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        transition: 0.25s;

        :hover {
          opacity: 0.5;
        }
      }
    }
  }

  .tabs {
    max-width: 288px;
    margin: 0 auto;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-evenly;

    p {
      width: 100%;
      padding: 12px 0;
      border-bottom: 2px solid #23272a;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      transition: 0.25s;

      :hover {
        border-bottom: 2px solid dimgray;
      }

      :active {
        color: dimgray;
      }

      :nth-child(1) {
        border-bottom: ${(props) =>
          props.tab === 'Posts' ? '2px solid dimgray' : ''};
      }

      :nth-child(2) {
        border-bottom: ${(props) =>
          props.tab === 'Comments' ? '2px solid dimgray' : ''};
      }

      :nth-child(3) {
        border-bottom: ${(props) =>
          props.tab === 'Saved' ? '2px solid dimgray' : ''};
      }
    }
  }

  .card {
    padding: 16px;
    margin-bottom: 16px;
    background-color: #2c2f33;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .timestamp {
      margin-bottom: 4px;
      font-size: 0.625rem;
      font-weight: 500;
      color: #ffffff;
    }

    .content {
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
    }
  }

  @media (min-width: 375px) {
    .user {
      .information {
        .left-section {
          .display-name-and-track {
            flex-direction: row;
            align-items: center;

            .display-name {
              margin-right: 8px;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 972.8px;
  }
`;

export default UserContainer;
