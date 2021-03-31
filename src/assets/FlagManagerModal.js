import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { FlagChip } from './FlagChip';
import {
  Modal,
  Layout,
  Button,
  Row,
  Col,
  Menu,
  Divider,
  List,
  Avatar,
  Typography,
} from 'antd';
import { CheckOutlined, RiseOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;

const FlagManagerModal = (props) => {
  const { visible, setVisible } = props;
  const { id } = useParams;
  const { Sider, Content } = Layout;
  const { flagsData } = props;
  console.log('props', props);

  const [isLoading, setIsLoading] = useState(false);

  const [flaggingReasons, setFlaggingReasons] = useState([
    'All',
    'Spam',
    'Bullying or Harassment',
    'Hate Speech or Symbols',
    'Nudity or Sexual Content',
    'I just dislike it',
    'Other',
  ]);
  const [flagFilter, setFlagFilter] = useState();
  const [flagList, setFlagList] = useState(flagsData);

  useEffect(() => {
    setFlagList(flagsData);
  }, []);

  useEffect(() => {
    if (flagFilter === 'All') {
      setFlagList(flagsData);
    } else {
      const result = flagList.filter((flag) => {
        return flag.flagReason === flagFilter;
      });
      setFlagList(result);
    }
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
      className="manage-flag-modal"
      width={800}
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
        </Sider>
        <Content className="flag-list" styl>
          <List
            itemLayout="horizontal"
            dataSource={flagList}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={
                    <span>
                      {item.flagger_name} flagged this for {item.reason}
                    </span>
                  }
                  description={
                    item.note ? item.note : <i>No additional comment</i>
                  }
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlagManagerModal);
