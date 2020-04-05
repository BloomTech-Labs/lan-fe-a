const initialState = {
    user: {},
    currentUser: {},
    posts: [],
    currentPost: {},
    search: '',
    sort: '',
    filter: ''
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
        
        default:
            return state;
    };
};