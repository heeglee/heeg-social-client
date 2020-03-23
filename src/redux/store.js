import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-cli";
import thunk from "redux-thunk";
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {

};

// const composeEnhancers = composeWithDevTools({
//     realtime: true,
//     name: 'heeg-social-client',
//     hostname: 'localhost',
//     port: 8000 // the port your remotedev server is running at
// });

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    ui: uiReducer
});

const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middleware)
));

export default store;