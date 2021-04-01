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
  Popconfirm,
} from 'antd';

import { CheckOutlined, RiseOutlined, DeleteOutlined } from '@ant-design/icons';
import { archivePost, resolvePost } from '../store/actions/index';

const FlagManagerModal = (props) => {
  const {
    visible,
    setVisible,
    flagsData,
    reasons,
    archivePost,
    discussionID,
    resolvePost,
  } = props;
  const { id } = useParams;
  const { Sider, Content } = Layout;

  const [isLoading, setIsLoading] = useState(false);
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
    //! Currently, flags.length stays the same after a post approval. Needs logic to ensure flags are removed from the given discussion post and/or marked as 'checked' so they no longer appear in the given cards' flag chip.
    resolvePost(discussionID);
    setVisible(false);
  };
  const handleEscalate = () => {
    console.log('clicked Escalate');
  };
  const handleArchive = () => {
    archivePost(discussionID);
    setVisible(false);
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
            <Popconfirm
              title="Are you sure you want to archive this discussion?"
              onConfirm={handleArchive}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="default"
                icon={<DeleteOutlined />}
                style={{
                  background: 'rgba(211, 69, 91, .57)',
                  color: 'rgba(211, 69, 91)',
                }}
              >
                Archive
              </Button>
            </Popconfirm>
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

export default connect(mapStateToProps, { archivePost, resolvePost })(
  FlagManagerModal
);
