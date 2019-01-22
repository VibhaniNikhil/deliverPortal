import {combineReducers} from 'redux';
import Settings from './Settings';
import AuthReducer from './Auth';
import UserReducer from './User';


const reducers = combineReducers({
    settings: Settings,
    user: UserReducer,
    auth: AuthReducer,
});

export default reducers;
