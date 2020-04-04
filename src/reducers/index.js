const initialState = {
    user: {},
    fetchingUser: false,
    posts: [],
    fetchingPosts: false,
    currentPost: {}
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                fetchingUser: false
            };

        case 'FETCHING_USER':
            return {
                ...state,
                fetchingUser: true
            };

        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
                fetchingPosts: false
            };

        case 'FETCHING_POSTS':
            return {
                ...state,
                fetchingPosts: true
            };

        case 'SET_CURRENT_POST':
            return {
                ...state,
                currentPost: action.payload
            };
        
        default:
            return state;
    };
};