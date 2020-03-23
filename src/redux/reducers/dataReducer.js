import { SET_SQUEAKS_LIST, SET_SQUEAK, LOADING_DATA, POST_SQUEAK, LIKE_SQUEAK, UNLIKE_SQUEAK, DELETE_SQUEAK } from '../types';

const initialState = {
    squeaksList: [],
    squeak: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };

        case SET_SQUEAKS_LIST:
            return {
                ...state,
                squeaksList: action.payload,
                loading: false,
            };

        case SET_SQUEAK:
            return {
                ...state,
                squeak: action.payload
            };

        case POST_SQUEAK:
            return {
                ...state,
                squeaksList: [
                    action.payload,
                    ...state.squeaksList
                ]
            }

        case LIKE_SQUEAK:
        case UNLIKE_SQUEAK:
            let index = state.squeaksList.findIndex(squeak => squeak.screamId === action.payload.screamId);
            state.squeaksList[index] = action.payload;
            if (state.squeak.screamId === action.payload.screamId) {
                state.squeak = action.payload;
            }
            return {
                ...state
            };

        case DELETE_SQUEAK:
            return state;
        // CHK
        //     index = state.squeaksList.findIndex(squeak => squeak.screamId === action.payload);
        //     state.squeaksList.splice(index, 1);
        //     return {
        //         ...state
        //     };
        
        default:
            return state;
    }
}