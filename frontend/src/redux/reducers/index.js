import {
    combineReducers
} from "redux";

// reducers
import auth from './auth';
import profile from './profile';
import logs from './logs';

const rootReducer = combineReducers({
    auth,
    profile,
    logs,
});

export default rootReducer;