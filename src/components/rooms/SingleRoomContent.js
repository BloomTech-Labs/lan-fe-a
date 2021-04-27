import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Card, Modal } from 'antd';
import { fetchRooms, updateRoom, deleteRoom } from '../../store/actions';

const SingleRoomContent = (props) => {
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
      .deleteRoom(id)
      .then(() => {
        props.fetchRooms();
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
          width: 300,
          marginBottom: '20px',
          marginLeft: '20px',
          display: 'flex',
          flexFlow: 'column wrap',
          justifyContent: 'space-between',
        }}
        headStyle={{backgroundColor: '#dee2e6', color: '#000' }}
        extra={
          <Button type="primary" onClick={showModal}>
            Edit
          </Button>
        }
      >
        {props.room.description}
        {EditModal}
        <>
          <Button
            style={{ marginTop: '20px', width: '100%' }}
            danger
            onClick={() => handleDeleteRoom(props.room.id)}
          >
            Delete Room
          </Button>
        </>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  updateRoom,
  deleteRoom,
})(SingleRoomContent);
