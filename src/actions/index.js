/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios';
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
        history.push('/onboarding');
      } else {
        history.push('/');
      }
    })
    .catch((error) => console.log(error));
};

// Fetches logged in user
export const fetchUser = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user`)
    .then((response) => {
      dispatch({ type: 'SET_USER', payload: response.data.user });
      console.log('FETCH USER ACTION', response.data.user);
    })
    .catch((error) => console.log(error));
};

// Fetches all users
export const fetchUsers = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/admin/users/`)
    .then((response) => {
      dispatch({ type: 'SET_USERS', payload: response.data });
    })
    .catch((error) => console.log(error));
};

// Logs out user
export const logOut = (history) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/auth/logout`)
    .then((response) => {
      localStorage.removeItem('id');
      history.push('/welcome');
    })
    .catch((error) => console.log(error));
};

// Deletes user
export const deleteUser = (id) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/admin/users/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// Fetches a user's liked posts
export const fetchUsersLikedPosts = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/post/like`)
    .then((response) =>
      dispatch({ type: 'SET_USERS_LIKED_POSTS', payload: response.data })
    )
    .catch((error) => console.log(error));
};

// Fetches a user's liked comments
export const fetchUsersLikedComments = () => (dispatch) => {
  axios.get(`${BACKEND_URL}/api/user/comment/like`).then((response) => {
    console.log('USERS_LIKED_COMMENTS', response.data);
    dispatch({ type: 'SET_USERS_LIKED_COMMENTS', payload: response.data });
  });
};

// Fetches a user's profile
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

// Updates a user's display name
export const updateUserDisplayName = (userID, displayName) => (dispatch) => {
  axios
    .put(`${BACKEND_URL}/api/user/displayname`, { userID, displayName })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

// Updates a user's role
export const updateUserRole = (id, role) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/admin/users/${id}/${role}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

// Sets user track during onboarding
export const setTrack = (track, token) => (dispatch) => {
  return axios.put(`${BACKEND_URL}/api/user/track`, { track, token });
};

// Fetches all rooms
export const fetchRooms = () => (dispatch) => {
  return axios
    .get(`${BACKEND_URL}/api/room`)
    .then((response) => dispatch({ type: 'SET_ROOMS', payload: response.data }))
    .catch((error) => console.log(error));
};

// Creates a room
export const createRoom = (room) => (dispatch) => {
  return axios
    .post(`${BACKEND_URL}/api/room`, { ...room })
    .then(() => {
      console.log('room added');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Updates a room
export const updateRoom = (id, room) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/admin/rooms/${id}`, room)
    .then((res) => {
      console.log('room updated');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Deletes a room
export const deleteRoom = (id) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/room/${id}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

// Creates a post
export const postQuestion = (title, description, room, history) => (
  dispatch
) => {
  return axios.post(`${BACKEND_URL}/api/post/create`, {
    title: title,
    description: description,
    room_id: room,
  });
};

export const updatePost = (id, newDescription) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/post/update/${id}`, { newDescription })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
};

// Deletes a post
export const deletePost = (postID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/post/delete/${postID}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.message));
};

// Fetches posts based on user search input

export const fetchSearch = (search) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/search`, { search })
    .then((response) => {
      console.log('responding', response.data);
      dispatch({ type: 'SET_POSTS', payload: response.data });
    })
    .catch((error) => console.log(error));
};

// Fetches a post
export const fetchPost = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST' });
  axios
    .get(`${BACKEND_URL}/api/post/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST', payload: response.data })
    )
    .catch((error) => console.log(error));
};

// Fetches posts, ordered by most recent
export const fetchRecent = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/recent`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch((error) => console.log(error));
};

// Fetches posts, ordered by number of likes
export const fetchPopular = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/popular`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch((error) => console.log(error));
};

// Likes a post
export const like = (postID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/post/like/${postID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

// Removes like from a post
export const unlike = (postID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/post/like/${postID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

// Creates a comment
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

// Likes a comment
export const likeComment = (commentID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

// Removes like from a comment
export const unlikeComment = (commentID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

// Fetches a post's comments, ordered by recent
export const fetchPostCommentsByRecent = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axios
    .get(`${BACKEND_URL}/api/comment/recent/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch((error) => console.log(error));
};

// Fetches a post's comments, ordered by number of likes
export const fetchPostCommentsByPopular = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axios
    .get(`${BACKEND_URL}/api/comment/popular/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch((error) => console.log(error));
};

// Fetches all posts in a specific room
export const fetchPostByRoom = (roomID) => (dispatch) => {
  axios.get(`${BACKEND_URL}/api/room/${roomID}/recent`).then((res) => {
    console.log(res);
    dispatch({ type: 'SET_POSTS', payload: res.data });
  });
};

// Updates search state
export const setSearch = (search) => (dispatch) => {
  dispatch({ type: 'SET_SEARCH', payload: search });
};

export const flagPost = (id) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/mod/posts/${id}`)
    .then(() => {
        console.log('Post flagged')
    })
    .catch((err) => {
        console.log(err)
    })
}

export const flagComment = (id) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/mod/comments/${id}`)
    .then(() => {
        console.log('Comment flagged')
    })
    .catch((err) => {
        console.log(err)
    })
}

export const fetchFlaggedPosts = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/mod/posts`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const fetchFlaggedComments = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/mod/comments`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const archivePost = (postID) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/mod/posts/${postID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const archiveComment = (commentID) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/mod/comments/${commentID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const resolvePost = (postID) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/mod/posts/${postID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const resolveComment = (commentID) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/mod/comments/${commentID}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};
