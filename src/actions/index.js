import axios from 'axios';
axios.defaults.withCredentials = true;

export const success = history => dispatch => {
    axios.get('http://localhost:5000/api/auth/user')
        .then(response => {
            localStorage.setItem('id', response.data.user.id);
            if (response.data.user.track === null) {
                history.push('/onboarding');
            } else {
                history.push('/');
            };
        })
        .catch(error => console.log(error));
};

export const logOut = history => dispatch => {
    axios.get('http://localhost:5000/api/auth/logout')
        .then(response => {
            localStorage.removeItem('id');
            localStorage.removeItem('display_name');
            history.push('/welcome');
        })
        .catch(error => console.log(error));
};

export const setTrack = (track, token) => dispatch => {
    return axios.put('http://localhost:5000/api/auth/user/track', { track: track , token: token });
};

export const setUser = () => dispatch => {
    return axios.get('http://localhost:5000/api/auth/user')
        .then(response => dispatch({ type: 'SET_USER', payload: response.data.user }))
        .catch(error => console.log(error));
};