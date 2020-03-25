import { SET_SQUEAKS_LIST, SET_SQUEAK, LOADING_DATA, POST_SQUEAK, LIKE_SQUEAK, UNLIKE_SQUEAK, LOADING_UI, STOP_LOADING_UI, SET_ERRORS, CLEAR_ERRORS, SUBMIT_COMMENT } from '../types';
import axios from 'axios';

export const getSqueaksList = () => dispatch => {
    dispatch({
        type: LOADING_DATA
    });

    axios.get('/squeaks').then(result => {
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

    axios.get(`/squeaks/${squeakId}`).then(result => {
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
    axios.post('/squeaks', newSqueak).then(result => {
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

export const submitComment = (squeakId, commentData) => dispatch => {
    axios.post(`/squeaks/${squeakId}/comments`, commentData).then(result => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: result.data,
        });

        dispatch(clearErrors());
    }).catch(e => {
        dispatch({
            type: SET_ERRORS,
            payload: e.response.data
        });
    });
};

export const likeSqueak = squeakId => dispatch => {
    axios.get(`/squeaks/${squeakId}/like`).then(result => {
        dispatch({
            type: LIKE_SQUEAK,
            payload: result.data
        })
    }).catch (e => console.error(e));
};

export const unlikeSqueak = squeakId => dispatch => {
    axios.get(`/squeaks/${squeakId}/unlike`).then(result => {
        dispatch({
            type: UNLIKE_SQUEAK,
            payload: result.data
        })
    }).catch (e => console.error(e));
};

// CHK: think it'd be better dispatching SET_SQUEAKS_LIST, not DELETE_SQUEAK with returning deleted squeaks id
export const deleteSqueak = squeakId => dispatch => {
    axios.delete(`/squeaks/${squeakId}`).then(() => {
        // dispatch({
        //     type: DELETE_SQUEAK,
        //     payload: squeakId
        // });
        dispatch(getSqueaksList());
    }).catch(e => console.error(e));
};

export const getUserDetails = username => dispatch => {
    dispatch({
        type: LOADING_DATA,
    });

    axios.get(`/user/${username}`).then(result => {
        dispatch({
            type: SET_SQUEAKS_LIST,
            payload: result.data.squeaks
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