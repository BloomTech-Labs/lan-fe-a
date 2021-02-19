import axios from 'axios';
import { dispatch } from 'react-hot-toast';
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

// Authentication
export const success = (history) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user`, { credentials: true })
    .then((response) => {
      localStorage.setItem('id', response.data.user.id);
      if (response.data.user.track === null) {
        // Maybe don't do this, if the user doesn't select a track for some reason or abandons the session,
        // we should leave it be, have an option display a null track on posts,
        // and give them a heads up they haven't set a track with a toast notification... brainstorming
        history.push('/onboarding');
      } else {
        history.push('/');
      }
    })
    .catch((error) => console.log(error));
};

// Sort out this flow: success, fetchUser, fetchUserProfile
// react-query will help with making sure user object is in state
// Other one takes in a user ID, but do we have the user's ID available at all times (for example, when onboarding)
export const fetchUser = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user`)
    .then((response) => {
      dispatch({ type: 'SET_USER', payload: response.data.user });
      console.log('FETCH USER ACTION', response.data.user);
    })
    .catch((error) => console.log(error));
};

export const logOut = (history) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/auth/logout`)
    .then((response) => {
      localStorage.removeItem('id');
      history.push('/welcome');
    })
    .catch((error) => console.log(error));
};

// Onboarding?
export const setTrack = (track, token) => (dispatch) => {
  return axios.put(`${BACKEND_URL}/api/user/track`, { track, token });
};

//Rooms
export const fetchRooms = () => (dispatch) => {
  return axios
    .get(`${BACKEND_URL}/api/room`)
    .then((response) => dispatch({ type: 'SET_ROOMS', payload: response.data }))
    .catch((error) => console.log(error));
};

// Post
export const postQuestion = (
  title,
  description,
  track,
  category,
  room,
  history
) => (dispatch) => {
  return axios.post(`${BACKEND_URL}/api/post/create`, {
    title: title,
    description: description,
    track: track,
    category: category,
    room_id: room,
  });
};

export const fetchSearch = (search) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/search`, { search })
    .then((response) => {
      console.log('responding', response.data);
      dispatch({ type: 'SET_POSTS', payload: response.data });
    })
    .catch((error) => console.log(error));
};

// Search query, sort, filter, offset SEPERATELY
// Future Miguel here, perhaps not! Maybe.
export const fetchRecent = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/recent`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch((error) => console.log(error));
};

export const fetchPopular = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/popular`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch((error) => console.log(error));
};

export const fetchPost = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST' });
  axios
    .get(`${BACKEND_URL}/api/post/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST', payload: response.data })
    )
    .catch((error) => console.log(error));
};

export const setSearch = (search) => (dispatch) => {
  dispatch({ type: 'SET_SEARCH', payload: search });
};

export const like = (postID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/post/like/${postID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const unlike = (postID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/post/like/${postID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const fetchUsersLikedPosts = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/post/like`)
    .then((response) =>
      dispatch({ type: 'SET_USERS_LIKED_POSTS', payload: response.data })
    )
    .catch((error) => console.log(error));
};

// Comment
export const postComment = (user, postID, comment) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/comment`, { postID, comment })
    .then((response) => {
      dispatch({
        type: 'SET_POSTS_COMMENTS',
        payload: {
          ...response.data.comment,
          display_name: user.displayName,
          profile_picture: user.profilePicture,
          track: user.track,
        },
      });
    })
    .catch((error) => console.log(error));
};

export const fetchUsersLikedComments = () => (dispatch) => {
  axios.get(`${BACKEND_URL}/api/user/comment/like`).then((response) => {
    console.log('USERS_LIKED_COMMENTS', response.data);
    dispatch({ type: 'SET_USERS_LIKED_COMMENTS', payload: response.data });
  });
};

export const likeComment = (commentID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const unlikeComment = (commentID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

// Fetch post's comments by recent
export const fetchPostCommentsByRecent = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axios
    .get(`${BACKEND_URL}/api/comment/recent/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch((error) => console.log(error));
};

// Fetch post's comments by popular
export const fetchPostCommentsByPopular = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axios
    .get(`${BACKEND_URL}/api/comment/popular/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch((error) => console.log(error));
};

// Can this be used for authentication so we don't have redundant actions?
// The issue is the other one is for the user themselves, and this one is for other users when viewing their profile
export const fetchUserProfile = (userID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/${userID}`)
    .then((response) => {
      console.log(
        'FETCH USER PROFILE, DIFFERENT FROM AUTHENTICATION ONE',
        response.data
      );
      dispatch({ type: 'SET_CURRENT_USER', payload: response.data });
    })
    .catch((error) => console.log(error));
};

export const updateUserDisplayName = (userID, displayName) => (dispatch) => {
  axios
    .put(`${BACKEND_URL}/api/user/displayname`, { userID, displayName })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const fetchPostByRoom = (roomID) => (dispatch) => {
  axios.get(`${BACKEND_URL}/api/room/${roomID}/recent`).then((res) => {
    console.log(res);
    dispatch({ type: 'SET_POSTS', payload: res.data });
  });
};
