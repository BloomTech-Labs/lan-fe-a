const initialState = {
  user: {},
  currentUser: {},
  rooms: [],
  users: [],
  posts: [],
  totalPages: 1,
  mainSearchResults: {
    users: [],
    rooms: [],
    posts: [],
    comments: [],
  },
  currentPost: {},
  currentPostComments: [],
  search: '',
  sort: '',
  filter: '',
  usersLikedPosts: [],
  usersLikedComments: [],
  individualPostIsFetching: false,
  individualPostCommentsAreFetching: false,
  isDrawerVisible: false,
  isNewRoomModalVisible: false,
  isFlaggingModalVisible: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_ROOMS':
      return {
        ...state,
        rooms: action.payload,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
      };

    case 'SET_FLAGGED_POSTS':
      return {
        ...state,
        posts: action.payload,
      };

    case 'SET_REASONS':
      return {
        ...state,
        reasons: action.payload,
      };

    case 'START_FETCHING_CURRENT_POST':
      return {
        ...state,
        individualPostIsFetching: true,
      };

    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: action.payload,
        individualPostIsFetching: false,
      };

    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
      };

    case 'SET_FULL_SEARCH':
      return {
        ...state,
        mainSearchResults: action.payload,
      };

    case 'SET_USERS_LIKED_POSTS':
      return {
        ...state,
        usersLikedPosts: action.payload,
      };

    case 'SET_POSTS_COMMENTS':
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: [action.payload, ...state.currentPost.comments],
        },
      };

    case 'SET_USERS_LIKED_COMMENTS':
      return {
        ...state,
        usersLikedComments: action.payload,
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'START_FETCHING_CURRENT_POST_COMMENTS':
      return {
        ...state,
        individualPostCommentsAreFetching: true,
      };

    case 'SET_CURRENT_POST_COMMENTS':
      return {
        ...state,
        currentPostComments: action.payload,
        individualPostCommentsAreFetching: false,
      };

    case 'SET_DRAWER_VISIBILITY':
      return {
        ...state,
        isDrawerVisible: action.payload,
      };

    case 'SET_NEW_ROOM_MODAL_VISIBILITY':
      return {
        ...state,
        isNewRoomModalVisible: action.payload,
      };

    case 'SET_FLAGGING_MODAL':
      return {
        ...state,
        isFlaggingModalVisible: action.payload,
      };

    default:
      return state;
  }
};
