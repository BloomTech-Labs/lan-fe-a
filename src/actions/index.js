import axios from 'axios';
axios.defaults.withCredentials = true;

// Auth
export const success = history => dispatch => {
    axios.get('http://localhost:5000/api/user')
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

// Sort out this flow: success, fetchUser, fetchUserProfile
export const fetchUser = () => dispatch => {
    axios.get('http://localhost:5000/api/user')
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

// Onboarding?
export const setTrack = (track, token) => dispatch => {
    return axios.put('http://localhost:5000/api/user/track', { track, token });
};

// Post
export const postQuestion = (question, answer, track, category, history) => dispatch => {
    return (
        axios.post('http://localhost:5000/api/post/create', {
            question: question,
            answer: answer,
            track: track,
            category: category
        })
    );
};

// Search query, sort, filter, offset SEPERATELY
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
    axios.get(`http://localhost:5000/api/post/like/${postID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

export const unlike = postID => dispatch => {
    axios.delete(`http://localhost:5000/api/post/like/${postID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

export const fetchUsersLikedPosts = () => dispatch => {
    axios.get('http://localhost:5000/api/user/post/like')
        .then(response => dispatch({ type: 'SET_USERS_LIKED_POSTS', payload: response.data }))
        .catch(error => console.log(error));
};

// Comment
export const postComment = (user, postID, comment) => dispatch => {
    axios.post('http://localhost:5000/api/comment', { postID, comment })
        .then(response => {
            dispatch({ type: 'SET_POSTS_COMMENTS', payload: {
                ...response.data.comment,
                display_name: user.displayName,
                profile_picture: user.profilePicture,
                track: user.track
            } });
        })
        .catch(error => console.log(error))
};

export const fetchUsersLikedComments = () => dispatch => {
    axios.get('http://localhost:5000/api/user/comment/like')
        .then(response => {
            console.log('USERS_LIKED_COMMENTS', response.data);
            dispatch({ type: 'SET_USERS_LIKED_COMMENTS', payload: response.data });
        });
};

export const likeComment = commentID => dispatch => {
    axios.get(`http://localhost:5000/api/comment/like/${commentID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

export const unlikeComment = commentID => dispatch => {
    axios.delete(`http://localhost:5000/api/comment/like/${commentID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

// Auth?
export const fetchUserProfile = userID => dispatch => {
    axios.get(`http://localhost:5000/api/user/${userID}`)
        .then(response => {
            console.log(response.data);
            dispatch({ type: 'SET_CURRENT_USER', payload: response.data });
        })
        .catch(error => console.log(error));
};

export const updateUserDisplayName = (userID, displayName) => dispatch => {
    axios.put('http://localhost:5000/api/user/displayname', { userID, displayName })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
};