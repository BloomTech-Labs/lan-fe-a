import axios from 'axios';
axios.defaults.withCredentials = true;

export const success = history => dispatch => {
    axios.get('http://localhost:5000/api/auth/success')
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

export const logOut = history => dispatch => {
    axios.get('http://localhost:5000/api/auth/logout')
        .then(response => history.push('/'))
        .catch(error => console.log(error));
};