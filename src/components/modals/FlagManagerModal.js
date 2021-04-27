import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal, Layout, Button, Menu, List, Avatar, Popconfirm } from 'antd';

import { CheckOutlined, RiseOutlined, DeleteOutlined } from '@ant-design/icons';
import { archivePost, resolvePost } from '../../store/actions/index';

/* -------------------------------------------------------------------------- */
/*          flagList needs an infinite load scroll feature implemented        */
/*        see "scrolling loaded" at https://ant.design/components/list/       */
/* -------------------------------------------------------------------------- */

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
    } else if (flagsData) {
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
    >
      <Layout>
        <Sider>
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
            <Menu.Divider />
          </Menu>
          <div className="action-buttons">
            <Button
              type="primary"
              block
              icon={<CheckOutlined />}
              onClick={handleApprove}
            >
              Accept
            </Button>

            <Popconfirm
              title="Are you sure you want to archive this discussion?"
              onConfirm={handleArchive}
              okText="Yes"
              cancelText="No"
            >
              <Button type="default" icon={<DeleteOutlined />}>
                Archive
              </Button>
            </Popconfirm>

            <Button
              type="default"
              icon={<RiseOutlined />}
              onClick={handleEscalate}
            >
              Escalate
            </Button>
          </div>
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
