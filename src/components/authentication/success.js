import React, { useEffect } from 'react';
import axios from 'axios';
import SuccessContainer from './styles/successStyle';
import loadingicon from '../../img/loading-icon.png';
axios.defaults.withCredentials = true;

const Success = props => {
    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/success')
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, []);

    const logOut = () => {
        axios.get('http://localhost:5000/api/auth/logout')
            .then(response => {
                console.log(response);
                props.history.push('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <SuccessContainer>
            <img src={loadingicon} alt='loading icon' onClick={logOut} />
        </SuccessContainer>
    );
};

export default Success;