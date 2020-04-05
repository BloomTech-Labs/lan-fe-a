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

export const fetchUser = () => dispatch => {
    axios.get('http://localhost:5000/api/auth/user')
        .then(response => dispatch({ type: 'SET_USER', payload: response.data.user }))
        .catch(error => console.log(error));
};

export const logOut = history => dispatch => {
    axios.get('http://localhost:5000/api/auth/logout')
        .then(response => {
            localStorage.removeItem('id');
            history.push('/welcome');
        })
        .catch(error => console.log(error));
};

export const setTrack = (track, token) => dispatch => {
    return axios.put('http://localhost:5000/api/auth/user/track', { track: track , token: token });
};

export const postQuestion = (question, answer, track, category, history) => dispatch => {
    axios.post('http://localhost:5000/api/post/create', {
        question: question,
        answer: answer,
        track: track,
        category: category
    })
        .then(response => {
            console.log(response);
            history.push('/');
        })
        .catch(error => console.log(error));
};

// search query, sort, filter, offset SEPERATELY
export const fetchPosts = search => dispatch => {
    axios.post('http://localhost:5000/api/post', { search })
        .then(response => dispatch({ type: 'SET_POSTS', payload: response.data }))
        .catch(error => console.log(error));
};

export const fetchPost = postID => dispatch => {
    axios.get(`http://localhost:5000/api/post/${postID}`)
        .then(response => dispatch({ type: 'SET_CURRENT_POST', payload: response.data }))
        .catch(error => console.log(error));
};

export const setSearch = search => dispatch => {
    dispatch({ type: 'SET_SEARCH', payload: search });
};

export const like = postID => dispatch => {
    axios.get(`http://localhost:5000/api/like/${postID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};