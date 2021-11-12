import {combineReducers} from 'redux';
import auth from './authReducer.js';
import token from './tokenReducer.js';

export default combineReducers({
    auth,
    token
})