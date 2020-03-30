import axios from 'axios';
axios.defaults.withCredentials = true;

export const success = history => {
    axios.get('http://localhost:5000/api/auth/success')
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

export const logOut = history => {
    axios.get('http://localhost:5000/api/auth/logout')
        .then(response => {
            console.log(response);
            history.push('/');
        })
        .catch(error => console.log(error));
};