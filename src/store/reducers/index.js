const initialState = {
  feedpost:[],
  bugs: [],
  currentBug: {},
  messages: [],
  currentUsersLikedRooms: [],
  user: {},
  currentUser: {},
  rooms: [],
  privateRooms: [],
  currentPrivateRoom: {},
  users: [],
  usersAdmin: [],
  posts: [],
  flaggedPosts: [],
  flaggedComments: [],
  totalPages: 1,
  mainSearchResults: {
    users: [],
    posts: [],
    rooms: [],
    flaggedPosts: [],
    flaggedComments: [],
    totalPages: 1,
  },
  currentPost: {},
  currentPostComments: [],
  search: '',
  sort: '',
  filter: '',
  flagReasons: [],
  usersLikedPosts: [],
  usersLikedComments: [],
  isLoading: false,
  individualPostIsFetching: false,
  individualPostCommentsAreFetching: false,
  isDrawerVisible: false,
  isNewRoomModalVisible: false,
  isReportBugModalVisible: false,
  showFlagModal: false,
  showModModal: false,
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

    case 'SET_USERS_ADMIN':
      return {
        ...state,
        usersAdmin: action.payload,
      };

    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
        totalPages: action.payload.totalPages,
      };

    case 'SET_FLAGGED_POSTS':
      return {
        ...state,
        flaggedPosts: action.payload,
      };

    case 'SET_FLAGGED_COMMENTS':
      return {
        ...state,
        flaggedComments: action.payload,
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

    case 'SET_REPORT_BUG_MODAL_VISIBILITY':
      return {
        ...state,
        isReportBugModalVisible: action.payload,
      };

    case 'SET_FLAGGING_MODAL':
      return {
        ...state,
        isFlaggingModalVisible: action.payload,
      };
    case 'FETCH_FLAGREASONS_SUCCESS':
      return {
        ...state,
        flagReasons: action.payload,
      };

    case 'SET_CURRENT_USERS_LIKED_ROOMS':
      return {
        ...state,
        currentUsersLikedRooms: action.payload,
      };

    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'SET_SHOW_FLAGGING_MODAL':
      return {
        ...state,
        showFlagModal: action.payload,
      };

    case 'SET_SHOW_MOD_MODAL':
      return {
        ...state,
        showModModal: action.payload,
      };

    case 'SET_BUGS':
      return {
        ...state,
        bugs: action.payload,
      };

    case 'SET_CURRENT_BUG':
      return {
        ...state,
        currentBug: action.payload,
      };
    case 'SET_FEED_POST':
      return{
        ...state,
        feedpost: action.payload,
      }

    case 'SET_PRIVATE_ROOMS':
      return {
        ...state,
        privateRooms: action.payload,
      };

    case 'SET_CURRENT_PRIVATE_ROOM':
      return {
        ...state,
        currentPrivateRoom: action.payload,
      };

    default:
      return state;
  }
};
