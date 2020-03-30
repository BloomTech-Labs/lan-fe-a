import axios from 'axios';
axios.defaults.withCredentials = true;

export const success = history => dispatch => {
    axios.get('http://localhost:5000/api/auth/success')
        .then(response => {
            console.log(response);
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('display_name', response.data.user.displayName);
            if (response.data.user.track === null) {
                history.push('/onboarding');
            } else {
                history.push('/dashboard');
            };
        })
        .catch(error => console.log(error));
};

export const logOut = history => dispatch => {
    axios.get('http://localhost:5000/api/auth/logout')
        .then(response => {
            localStorage.removeItem('id');
            localStorage.removeItem('display_name');
            history.push('/');
        })
        .catch(error => console.log(error));
};