import {
    STORE_USER_LOGS,
    SET_GOAL_STATUS,
    SET_LOADING,
} from "../../constants/logs";
import {
    LOGS_KEY
} from "../../constants/keys";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

const initialState = {
    loading: false,
    goalStatus: 1,
    userLogs: []
};

const logs = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USER_LOGS:
            return {
                ...state,
                userLogs: [...action.userLogs]
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case SET_GOAL_STATUS:
            return {
                ...state,
                goalStatus: state.goalStatus - action.time
            };
        default:
            return state
    }
};

const config = {
    key: LOGS_KEY,
    storage: storage,
    whitelist: ['goalStatus']
};

export default persistReducer(config, logs)