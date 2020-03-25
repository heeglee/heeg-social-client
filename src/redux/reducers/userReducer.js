import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SQUEAK, UNLIKE_SQUEAK, MARK_NOTIFICATIONS_READ } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };

        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                ...state,
                ...action.payload,
                loading: false,
                authenticated: true,
            };

        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };

        case LIKE_SQUEAK:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        username: state.credentials.username,
                        squeakId: action.payload.squeakId
                    }
                ]
            };

        case UNLIKE_SQUEAK:
            return {
                ...state,
                likes: state.likes.filter(like => like.squeakId !== action.payload.squeakId)
            }

        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(noti => noti.read = true);
            return {
                ...state
            };

        default:
            return state;
    }
}