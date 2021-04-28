import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getBugs,
  reportBug,
  setReportBugModalVisibility,
  getBugImageURL,
} from '../../store/actions';
import { Form, Modal, Input, Button, Upload } from 'antd';
import { BugOutlined, FileAddOutlined } from '@ant-design/icons';

const CreateNewBugModal = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileList, setFileList] = useState([]);
  const formRef = useRef();

  const inputHandler = (prevValues, curValues) => {
    setTitle(curValues.title);
    setDescription(curValues.description);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    if (fileList.length) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0].originFileObj);
      reader.onloadend = () => {
        props.getBugImageURL(reader.result).then((url) => {
          props
            .reportBug({
              user_id: props.user.id,
              title,
              description,
              photo_url: url,
            })
            .then(() => {
              setTitle('');
              setDescription('');
              setFileList([]);
              formRef.current.resetFields();
            });
        });
      };
    } else {
      props
        .reportBug({
          user_id: props.user.id,
          title,
          description,
        })
        .then(() => {
          setTitle('');
          setDescription('');
          setFileList([]);
          formRef.current.resetFields();
          props.getBugs();
        });
    }

    props.setReportBugModalVisibility(false);
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setFileList([]);
    formRef.current.resetFields();
    props.setReportBugModalVisibility(false);
  };

  return (
    <Modal
      title={
        <>
          <BugOutlined /> <span>Report a Bug</span>
        </>
      }
      centered
      visible={props.visible}
      okButtonProps={{
        htmlType: 'submit',
        disabled: false,
      }}
      okText="Report"
      onOk={handleSubmission}
      onCancel={handleCancel}
    >
      <Form ref={formRef}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Title required' }]}
          shouldUpdate={inputHandler}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Description required' }]}
          shouldUpdate={inputHandler}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          label="Screenshot"
          extra="Please add a screenshot of the bug"
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            onChange={handleUpload}
            fileList={fileList}
            maxCount={1}
          >
            <Button>
              <FileAddOutlined /> Select File
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    visible: state.isReportBugModalVisible,
  };
};

export default connect(mapStateToProps, {
  getBugs,
  reportBug,
  getBugImageURL,
  setReportBugModalVisibility,
})(CreateNewBugModal);
