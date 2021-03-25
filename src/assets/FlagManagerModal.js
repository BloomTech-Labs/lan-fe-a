import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { Modal, Layout, Button } from 'antd';

const FlagManagerModal = (props) => {
  const { visible, setVisible } = props;
  const { id } = useParams;
  const { path, url } = useRouteMatch;
  const { Sider, Content } = Layout;

  const [isLoading, setIsLoading] = useState(false);
  const [flaggingReasons, setFlaggingReasons] = useState([
    'Spam',
    'Bullying or Harrassment',
    'Hate Speech or Symbols',
    'Nudity or Sexual Content',
    'I just dislike it',
    'Other',
  ]);
  const [flagList, setFlagList] = useState('this is the list of flags');

  useEffect(() => {
    //fetch reasons for flagging
    //fetch flags by discussion or comment id
    setFlaggingReasons();
    setFlagList();
  }, []);

  const handleApprove = () => {
    console.log('clicked Approve');
  };
  const handleEscalate = () => {
    console.log('clicked Escalate');
  };
  const handleArchive = () => {
    console.log('clicked Archive');
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Manage Flag"
      visible={visible}
      centered
      onCancel={handleCancel}
    >
      <Layout>
        <Sider>
          {flaggingReasons}
          <div className="action-buttons">
            <Button
              style={{ background: 'green', color: 'white' }}
              onClick={handleApprove}
            >
              Accept
            </Button>
            <Button style={{ background: 'yellow' }} onClick={handleEscalate}>
              Escalate
            </Button>
            <Button
              style={{ background: 'red', color: 'white' }}
              onClick={handleArchive}
            >
              Archive
            </Button>
          </div>
        </Sider>
        <Content>{flagList}</Content>
      </Layout>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlagManagerModal);
