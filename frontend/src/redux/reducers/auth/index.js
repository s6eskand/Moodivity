import {
    STORE_TOKEN,
    STORE_OWNER,
} from "../../constants/auth";
import {
    AUTH_KEY
} from "../../constants/keys";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

const initialState = {
    isAuthenticated: false,
    token: null,
    owner: null,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TOKEN:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                token: action.token
            };
        case STORE_OWNER:
            return {
                ...state,
                owner: action.owner
            };
        default:
            return state;
    }
};

const config = {
    key: AUTH_KEY,
    storage: storage,
    whitelist: ['isAuthenticated', 'owner'],
};

export default persistReducer(config, auth)