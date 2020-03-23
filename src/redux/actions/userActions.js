import { SET_USER, LOADING_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, MARK_NOTIFICATIONS_READ } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
    dispatch({
        type: LOADING_UI
    });

    axios.post('/login', userData).then(result => {
        setAuthorizationHeader(result.data.token);

        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });

        history.push('/');

    }).catch(e => {
        // TODO: error handling; key 'error' -> general.
        console.log(e);
        dispatch({
            type: SET_ERRORS,
            payload: e.response.data
        });
    });
};

export const signUpUser = (newUserData, history) => dispatch => {
    dispatch({
        type: LOADING_UI
    });

    axios.post('/signup', newUserData).then(result => {
        setAuthorizationHeader(result.data.token);

        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });

        history.push('/');

    }).catch(e => {
        // TODO: error handling; key 'error' -> general.
        console.log(e);
        dispatch({
            type: SET_ERRORS,
            payload: e.response.data
        });
    });
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('FirebaseIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED
    });
}

// TODO: getUSerData -> rename getCurrentUserData
export const getUserData = () => dispatch => {
    dispatch({
        type: LOADING_USER,
    });
    
    axios.get('/user').then(result => {
        console.log(result.data.userData);
        dispatch({
            type: SET_USER,
            payload: result.data.userData
        });
    }).catch(e => {
        console.error(e);
    });
};

export const uploadImage = formData => dispatch => {
    dispatch({
        type: LOADING_USER,
    });

    axios.post('/user/image', formData).then(() => {
        dispatch(getUserData());
    }).catch(e => console.error(e));
};

export const editUserDetails = userDetails => dispatch => {
    dispatch({
        type: LOADING_USER
    });

    axios.post('/user', userDetails).then(() => {
        dispatch(getUserData());

    }).catch(e => console.error(e));
};

export const markNotificationsRead = notificationId => dispatch => {
    axios.post('/notifications', notificationId).then(result => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ,
        });

    }).catch(e => {
        console.error(e);
    });
}

const setAuthorizationHeader = token => {
    const FirebaseIdToken = `Bearer ${token}`;
    localStorage.setItem('FirebaseIdToken', FirebaseIdToken);
    axios.defaults.headers.common['Authorization'] = FirebaseIdToken;
};