import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { FlagChip } from './FlagChip';
import { Modal, Layout, Button, Row, Col, Menu, Divider } from 'antd';
import { CheckOutlined, RiseOutlined, DeleteOutlined } from '@ant-design/icons';

const FlagManagerModal = (props) => {
  const { visible, setVisible } = props;
  const { id } = useParams;
  const { path, url } = useRouteMatch;
  const { Sider, Content } = Layout;

  const [isLoading, setIsLoading] = useState(false);

  const [flaggingReasons, setFlaggingReasons] = useState([
    'All',
    'Spam',
    'Bullying or Harrassment',
    'Hate Speech or Symbols',
    'Nudity or Sexual Content',
    'I just dislike it',
    'Other',
  ]);
  const [flagFilter, setFlagFilter] = useState('All');
  const [flagList, setFlagList] = useState('this is the list of flags');

  useEffect(() => {
    //fetch reasons for flagging
    //fetch flags by discussion or comment id
    // setFlaggingReasons();
    // setFlagList();
  }, []);

  useEffect(() => {
    //change flagging list to show only ones that match the filter
    console.log('use effect has run');
  }, [flagFilter]);

  const handleFilterChange = (e) => {
    setFlagFilter(flaggingReasons[e.key]);
  };

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
      footer={null}
    >
      <Layout>
        <Sider>
          <Row>
            <Menu defaultSelectedKeys={['0']}>
              {flaggingReasons.map((reason, idx) => {
                return (
                  <Menu.Item key={idx} onClick={handleFilterChange}>
                    {reason}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Row>
          <Divider />
          <Row justify="space-around">
            <Col>
              <Button
                type="default"
                icon={<CheckOutlined />}
                style={{
                  background: 'rgba(33, 120, 104, .57)',
                  color: 'rgba(33, 120, 104)',
                }}
                onClick={handleApprove}
              >
                Accept
              </Button>
            </Col>
          </Row>
          <Row justify="space-around">
            <Button
              type="default"
              icon={<DeleteOutlined />}
              style={{
                background: 'rgba(211, 69, 91, .57)',
                color: 'rgba(211, 69, 91)',
              }}
              onClick={handleArchive}
            >
              Archive
            </Button>
          </Row>
          <Row justify="space-around">
            <Button
              type="default"
              icon={<RiseOutlined />}
              style={{
                background: 'rgba(247, 195, 37, .57)',
                color: 'rgba(219, 175, 46)',
              }}
              onClick={handleEscalate}
            >
              Escalate
            </Button>
          </Row>
          <Row>
            <FlagChip flagged="10" comments="0" />
            <FlagChip flagged="5" comments="12" />
            <FlagChip flagged="0" comments="12" />
            <FlagChip flagged="0" comments="0" />
          </Row>
        </Sider>
        <Content>
          {/* check out infinite List load on ant design */}
          {flagList}
        </Content>
      </Layout>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlagManagerModal);
