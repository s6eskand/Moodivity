import {
    IS_PROFILE,
    STORE_USER_PROFILE,
} from "../../constants/profile";

import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";
import {PROFILE_KEY} from "../../constants/keys";

const initialState = {
    userProfile: {},
    hasBeenCreated: false
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            };
        case IS_PROFILE:
            return {
                ...state,
                hasBeenCreated: true
            };
        default:
            return state;
    }
};

const config = {
    key: PROFILE_KEY,
    storage: storage,
    whitelist: ['hasBeenCreated']
};

export default persistReducer(config, profile)