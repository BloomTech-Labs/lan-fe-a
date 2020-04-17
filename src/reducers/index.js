const initialState = {
    user: {},
    currentUser: {},
    posts: [],
    currentPost: {},
    search: '',
    sort: '',
    filter: '',
    usersLikedPosts: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload
            };

        case 'SET_CURRENT_POST':
            return {
                ...state,
                currentPost: action.payload
            };

        case 'SET_SEARCH':
            return {
                ...state,
                search: action.payload
            };

        case 'SET_USERS_LIKED_POSTS':
            return {
                ...state,
                usersLikedPosts: action.payload
            };

        case 'SET_POSTS_COMMENTS':
            return {
                ...state,
                currentPost: {
                    ...state.currentPost,
                    comments: [
                        action.payload,
                        ...state.currentPost.comments
                    ]
                }
            };
        
        default:
            return state;
    };
};