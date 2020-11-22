import {
    STORE_USER_PROFILE,
} from "../../constants/profile";

const initialState = {
    userProfile: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case STORE_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            };
        default:
            return state;
    }
}