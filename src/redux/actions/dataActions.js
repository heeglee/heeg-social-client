import { SET_SQUEAKS_LIST, SET_SQUEAK, LOADING_DATA, POST_SQUEAK, LIKE_SQUEAK, UNLIKE_SQUEAK, LOADING_UI, STOP_LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from '../types';
import axios from 'axios';

export const getSqueaksList = () => dispatch => {
    dispatch({
        type: LOADING_DATA
    });

    axios.get('/screams').then(result => {
        console.log(result.data);

        dispatch({
            type: SET_SQUEAKS_LIST,
            payload: result.data
        });
        
    }).catch(e => {
        console.error(e);
        dispatch({
            type: SET_SQUEAKS_LIST,
            payload: []
        });
    });
};

export const getSqueak = squeakId => dispatch => {
    dispatch({
        type: LOADING_UI
    });

    axios.get(`/screams/${squeakId}`).then(result => {
        dispatch({
            type: SET_SQUEAK,
            payload: result.data,
        });

        dispatch({
            type: STOP_LOADING_UI
        });

    }).catch(e => console.error(e));
};

export const postSqueak = newSqueak => dispatch => {
    dispatch({
        type: LOADING_UI
    });
    // TODO: setSqueaksList() -> POST CALL -> dispatch POST_SQUEAK
    axios.post('/screams', newSqueak).then(result => {
        dispatch({
            type: POST_SQUEAK,
            payload: result.data,
        });

        dispatch({
            type: CLEAR_ERRORS,
        });

    }).catch(e => {
        dispatch({
            type: SET_ERRORS,
            payload: e.response.data,
        });
    });
};

export const likeSqueak = squeakId => dispatch => {
    axios.get(`/screams/${squeakId}/like`).then(result => {
        dispatch({
            type: LIKE_SQUEAK,
            payload: result.data
        })
    }).catch (e => console.error(e));
};

export const unlikeSqueak = squeakId => dispatch => {
    axios.get(`/screams/${squeakId}/unlike`).then(result => {
        dispatch({
            type: UNLIKE_SQUEAK,
            payload: result.data
        })
    }).catch (e => console.error(e));
};

// CHK: think it'd be better dispatching SET_SQUEAKS_LIST, not DELETE_SQUEAK with returning deleted squeaks id
export const deleteSqueak = squeakId => dispatch => {
    axios.delete(`/screams/${squeakId}`).then(() => {
        // dispatch({
        //     type: DELETE_SQUEAK,
        //     payload: squeakId
        // });
        dispatch(getSqueaksList());
    }).catch(e => console.error(e));
};

export const getUserDetails = handle => dispatch => {
    dispatch({
        type: LOADING_DATA,
    });

    axios.get(`/user/${handle}`).then(result => {
        dispatch({
            type: SET_SQUEAKS_LIST,
            payload: result.data.screams
        });

    }).catch(e => {
        dispatch({
            type: SET_SQUEAKS_LIST,
            payload: null
        });
    });
};

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};