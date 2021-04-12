import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

// import Feed from './Feed';

const FaqContent = () => {
  const { Header, Content } = Layout;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: '0px 0px',
          background: '#f0f2f5',
          display: 'flex',
          justifyContent: 'flex-start',
          height: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignSelf: 'flex-start',
          }}
        >
          <h2>Frequently Asked Questions</h2>
        </div>
      </Header>
      <Content
        style={{
          display: 'flex',
          flexFlow: 'column wrap',
          justifyContent: 'flex-start',
        }}
      >
        <h3>What is Lambda Alumni Network?</h3>
        <p>
          Lambda Alumni Network is a platform that allows Lambda School students
          to post, view, and learn through a community geared toward growth.
        </p>
        <br />
        <h3>Why Lambda Alumni Network?</h3>
        <p>
          I felt there wasn&apos;t a platform who&apos;s sole purpose was for
          Alumni to continue to grow and communicate. Often it was tacked on to
          slack and not really given much focus.
        </p>
        <br />
        <h3>Is it easy to get started with Lambda Alumni Network?</h3>
        <p>
          Extremely easy. You can register in seconds and immediately start
          viewing, responding, and posting in the community.
        </p>
        <br />
        <h3>Who built Lambda Alumni Network?</h3>
        <p>
          <a
            href="https://github.com/miugel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Miguel was the creator of Lambda Alumni Network
          </a>{' '}
          and it is not supported by Lambda Students through the labs program
        </p>
        <br />
        <h3>What tech stack are you using?</h3>
        <p>
          React and styled-components on the front end and Express and Postgres
          on the back end.
        </p>
        <br />
        <h3>How can I get involved?</h3>
        <p>
          You can fork the repository, make changes, and submit a pull request.
          If the changes are satisfactory, we will merge!
        </p>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {})(FaqContent);
