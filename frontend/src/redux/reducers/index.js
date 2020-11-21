import {
    combineReducers
} from "redux";

// reducers
import auth from './auth';

const rootReducer = combineReducers({
    auth,
});

export default rootReducer;