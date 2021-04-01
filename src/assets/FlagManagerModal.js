import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import {
  Modal,
  Layout,
  Button,
  Row,
  Menu,
  Divider,
  List,
  Avatar,
  Typography,
} from 'antd';
const { Title } = Typography;
import { CheckOutlined, RiseOutlined, DeleteOutlined } from '@ant-design/icons';

const FlagManagerModal = (props) => {
  const { visible, setVisible, flagsData, reasons } = props;
  const { id } = useParams;
  const { Sider, Content } = Layout;

  const [isLoading, setIsLoading] = useState(false);

  const [flaggingReasons, setFlaggingReasons] = useState(reasons);
  const [flagFilter, setFlagFilter] = useState();
  const [flagList, setFlagList] = useState(flagsData);

  useEffect(() => {
    setFlagFilter('All');
    setFlagList(flagsData);
  }, []);

  //Updates the list of flags based on the filter option selected
  useEffect(() => {
    if (flagFilter === 'All') {
      setFlagList(flagsData);
    } else {
      let result = flagsData.filter((flag) => {
        return flag.reason === flagFilter;
      });
      setFlagList(result);
    }
  }, [flagFilter]);

  const handleFilterChange = (e) => {
    setFlagFilter(e.key);
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
            <Menu defaultSelectedKeys={['All']}>
              <Menu.Item key="All" onClick={handleFilterChange}>
                All
              </Menu.Item>
              {reasons.map((reason) => {
                return (
                  <Menu.Item key={reason.reason} onClick={handleFilterChange}>
                    {reason.reason}
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
                  avatar={<Avatar src={`${item.flagger_profile_picture}`} />}
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

const mapStateToProps = (state) => {
  return {
    reasons: state.flagReasons,
  };
};

export default connect(mapStateToProps)(FlagManagerModal);
