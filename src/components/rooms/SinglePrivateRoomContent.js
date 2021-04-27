import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Card, Modal, Tag } from 'antd';
import {
  fetchPrivateRooms,
  updateRoom,
  deletePrivateRoom,
} from '../../store/actions';

const SinglePrivateRoomContent = (props) => {
  const { TextArea } = Input;

  const initialRoomValue = {
    name: props.room.room_name,
    description: props.room.description,
  };

  const [roomValues, SetRoomValues] = useState(initialRoomValue);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    SetRoomValues(initialRoomValue);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    props
      .updateRoom(props.room.id, {
        room_name: roomValues.name,
        description: roomValues.description,
      })
      .then(() => {
        props.fetchRooms();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    SetRoomValues(initialRoomValue);
    setIsModalVisible(false);
  };

  const handleUpdateChange = (e) => {
    SetRoomValues({ ...roomValues, [e.target.name]: e.target.value });
  };

  const EditModal = (
    <Modal
      title="Edit Room"
      visible={isModalVisible}
      onOk={handleOk}
      okText="Save"
      onCancel={handleCancel}
    >
      <h4>Title</h4>
      <Input
        name="name"
        style={{ marginBottom: '15px' }}
        value={roomValues.name}
        onChange={handleUpdateChange}
      />
      <h4>Description</h4>
      <TextArea
        name="description"
        value={roomValues.description}
        onChange={handleUpdateChange}
      />
    </Modal>
  );

  const handleDeleteRoom = (id) => {
    props
      .deletePrivateRoom(id)
      .then(() => {
        props.fetchPrivateRooms();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        title={props.room.room_name}
        bordered={false}
        style={{
          width: 350,
          marginBottom: '20px',
          marginLeft: '20px',
          display: 'flex',
          flexFlow: 'column wrap',
          justifyContent: 'space-between',
        }}
        headStyle={{ backgroundColor: '#dee2e6', color: '#000' }}
        // extra={
        //   <Button type="primary" onClick={showModal}>
        //     Edit
        //   </Button>
        // }
      >
        {props.room.description}
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
          }}
        >
          {props.room.users.map((item) => {
            return (
              <Tag style={{ margin: '5px' }} key={item.id}>
                {item.display_name}
              </Tag>
            );
          })}
        </div>

        {EditModal}

        <Button
          style={{ marginTop: '20px', width: '100%' }}
          danger
          onClick={() => handleDeleteRoom(props.room.id)}
        >
          Delete Room
        </Button>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.privateRooms,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  fetchPrivateRooms,
  updateRoom,
  deletePrivateRoom,
})(SinglePrivateRoomContent);
