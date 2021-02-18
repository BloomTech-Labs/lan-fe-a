import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header';
import SettingsContainer from './styles/settingsStyle';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

const AdminSettings = (props) => {
  const [currentMod, setCurrentMod] = useState()
  const [modTitle, setModTitle] = useState()
  const [modData, setModData] = useState()

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/admin/${currentMod}`)
      .then(res =>{
        setModData(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err.message))
  }, [currentMod])
  return (
    <>
      <Header history={props.history}/>
      
      <SettingsContainer>
        <h2>Admin Settings</h2>

        <div className='display-name'>
          <button className='update' onClick={() => {
            setCurrentMod('rooms');
            setModTitle('All Rooms');
          }}>
            Modify Rooms
          </button>
          <button className='update' onClick={() => {
            setCurrentMod('users');
            setModTitle('All Users');
          }}>
            Modify Users
          </button>
        </div>
        <h3>{modTitle}</h3>
        {modData ?
          currentMod == 'users' ?
            modData.map(item => {
              return (
                <div key={item.id}>
                  <h4>{item.display_name}</h4>
                  <p>{item.email}</p>
                </div>
              )
            })
          : modData.map(item => {
              return (
                <div key={item.id}>
                  <h4>{item.room_name}</h4>
                  <p>{item.description}</p>
                </div>
              )
            })
        : ''}
      </SettingsContainer>
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    test: 'test'
  }
}

export default connect(mapStateToProps, {})(AdminSettings);