/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
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
      toast('Welcome to the Lambda Alumni Network!');
    })
    .catch(() => toast('Oh no! An error has occurred.'));
};

// Fetches logged in user
export const fetchUser = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user`)
    .then((response) => dispatch({ type: 'SET_USER', payload: response.data.user }))
    .catch((error) => console.log(error));
};

// Fetches all users
export const fetchUsers = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/admin/users/`)
    .then((response) => dispatch({ type: 'SET_USERS', payload: response.data }))
    .catch(() => toast('There was a problem fetching users.'));
};

// Logs out user
export const logOut = (history) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/auth/logout`)
    .then((response) => {
      localStorage.removeItem('id');
      history.push('/welcome');
      toast('You have been successfully logged out. See ya later!');
    })
    .catch(() => toast('Uh oh. You have not been successfully logged out.'));
};

// Deletes user
export const deleteUser = (id) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/admin/users/${id}`)
    .then(() => toast('User has been deleted.'))
    .catch(() => toast('There was a problem deleting the user.'));
};

// Fetches a user's liked posts
export const fetchUsersLikedPosts = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/post/like`)
    .then((response) => dispatch({ type: 'SET_USERS_LIKED_POSTS', payload: response.data }))
    .catch(() => toast('Hmmm, there was a problem fetching liked posts.'));
};

// Fetches a user's liked comments
export const fetchUsersLikedComments = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/comment/like`)
    .then((response) => dispatch({ type: 'SET_USERS_LIKED_COMMENTS', payload: response.data }))
    .catch(() => toast('Hmmm, there was a problem fetching liked comments.'));
};

// Fetches a user's profile, different from auth fetch
export const fetchUserProfile = (userID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/user/${userID}`)
    .then((response) => dispatch({ type: 'SET_CURRENT_USER', payload: response.data }))
    .catch(() => toast('Hmmm, there was a problem fetching the user.'));
};

// Updates a user's display name
export const updateUserDisplayName = (userID, displayName) => (dispatch) => {
  axios
    .put(`${BACKEND_URL}/api/user/displayname`, { userID, displayName })
    .then(() => toast('Woo! Display name changed to ' + displayName))
    .catch(() => toast('Oh no! there was a problem updating your display name.'));
};

// Updates a user's role
export const updateUserRole = (id, role) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/admin/users/${id}/${role}`)
    .then(() => toast('Track successfully changed to' + role))
    .catch(() => toast('There was a problem updating the user\'s role.'));
};

// Sets user track during onboarding
export const setTrack = (track, token) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/user/track`, { track, token })
    .then(() => toast('Woo! Track successfully set to ' + track))
    .catch(() => toast('Uh oh! There was a problem setting your track.'));
};

// Fetches all rooms
export const fetchRooms = () => (dispatch) => {
  return axios
    .get(`${BACKEND_URL}/api/room`)
    .then((response) => dispatch({ type: 'SET_ROOMS', payload: response.data }))
    .catch(toast('Oh no! There was a problem fetching rooms.'));
};

// Creates a room
export const createRoom = (room) => (dispatch) => {
  return axios
    .post(`${BACKEND_URL}/api/room`, { ...room })
    .then(() => toast('Room Successfully Created'))
    .catch(() => toast('There was a problem creating the room.'));
};

// Updates a room
export const updateRoom = (id, room) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/admin/rooms/${id}`, room)
    .then(() => toast('Room Successfully Updated'))
    .catch(() => toast('There was a problem updating the room.'));
};

// Deletes a room
export const deleteRoom = (id) => (dispatch) => {
  return axios
    .delete(`${BACKEND_URL}/api/room/${id}`)
    .then(() => toast('Room Successfully Deleted'))
    .catch(() => toast('There was a problem deleting the room.'));
};

// Creates a post
export const postQuestion = (title, description, room, history) => (dispatch) => {
  return axios
    .post(`${BACKEND_URL}/api/post/create`, {
      title: title,
      description: description,
      room_id: room,
    })
    .then(() => toast('Nice! Your new post was just published.'))
    .catch(() => toast('Wait! There was a problem creating your post.'));
};

// Updates a post
export const updatePost = (id, newDescription) => (dispatch) => {
  return axios
    .put(`${BACKEND_URL}/api/post/update/${id}`, { newDescription })
    .then(() => toast('Your post was successfully updated.'))
    .catch(() => toast('Oh no! There was a problem updating your post.'));
};

// Deletes a post
export const deletePost = (postID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/post/delete/${postID}`)
    .then(() => toast('Your post was successfully deleted.'))
    .catch(() => toast('Hmm, there was a problem deleting your post.'));
};

// Fetches posts based on user search input
export const fetchSearch = (search) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/search`, { search })
    .then((response) => {
      console.log('responding', response.data);
      dispatch({ type: 'SET_POSTS', payload: response.data });
    })
    .catch(() => toast('Oh no! There was a problem fetching posts.'));
};

// Fetches a post
export const fetchPost = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST' });
  axios
    .get(`${BACKEND_URL}/api/post/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST', payload: response.data })
    )
    .catch(() => toast('Uh... looks like there was a problem fetching the post.'));
};

// Fetches posts, ordered by most recent
export const fetchRecent = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/recent`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch(() => toast('Shoot, there was a problem fetching posts.'));
};

// Fetches posts, ordered by number of likes
export const fetchPopular = () => (dispatch) => {
  axios
    .post(`${BACKEND_URL}/api/post/popular`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch(() => toast('Uh oh! There was a problem fetching posts.'));
};

// Likes a post
export const like = (postID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/post/like/${postID}`)
    .then((response) => console.log(response.data))
    .catch(() => toast('Oh no! There was a problem liking this post.'));
};

// Removes like from a post
export const unlike = (postID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/post/like/${postID}`)
    .then((response) => console.log(response.data))
    .catch(() => toast('Hmm, there was a problem unliking this post.'));
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
      toast('Sweet! Comment added.');
    })
    .catch(() => toast('Hmm, there was a problem adding your comment'));
};

// Likes a comment
export const likeComment = (commentID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then((response) => console.log(response.data))
    .catch(() => toast('Oh no! There was a problem liking this comment.'));
};

// Removes like from a comment
export const unlikeComment = (commentID) => (dispatch) => {
  axios
    .delete(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then((response) => console.log(response.data))
    .catch(() => toast('Uh oh! There was a problem unliking this comment.'));
};

// Fetches a post's comments, ordered by recent
export const fetchPostCommentsByRecent = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axios
    .get(`${BACKEND_URL}/api/comment/recent/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch(() => toast('Looks like there was trouble loading comments.'));
};

// Fetches a post's comments, ordered by number of likes
export const fetchPostCommentsByPopular = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axios
    .get(`${BACKEND_URL}/api/comment/popular/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data })
    )
    .catch(() => toast('Looks like there was trouble loading comments.'));
};

// Fetches all posts in a specific room
export const fetchPostByRoom = (roomID) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/room/${roomID}/recent`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch(() => toast('Oh no! Could not fetch posts.'));
};

// Updates search state
export const setSearch = (search) => (dispatch) => {
  dispatch({ type: 'SET_SEARCH', payload: search });
};

// Fetches flagged posts
export const fetchFlaggedPosts = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/mod/posts`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch(() => toast('There was a problem fetching flagged posts.'));
};

// Fetches flagged comments
export const fetchFlaggedComments = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/api/mod/comments`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch(() => toast('There was a problem fetching flagged comments.'));
};

export const archivePost = () => (dispatch) => {};

export const archiveComment = () => (dispatch) => {};

export const resolvePost = () => (dispatch) => {};

export const resolveComment = () => (dispatch) => {};
