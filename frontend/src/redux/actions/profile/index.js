import {
    GET_USER_PROFILE,
    STORE_USER_PROFILE,
    CREATE_USER_PROFILE,
    EDIT_USER_PROFILE,
} from "../../constants/profile";

export const getUserProfile = () => ({
    type: GET_USER_PROFILE,
});

export const storeUserProfile = (userProfile) => ({
    type: STORE_USER_PROFILE,
    userProfile,
});

export const createUserProfile = (profileInfo) => ({
    type: CREATE_USER_PROFILE,
    profileInfo,
});

export const editUserProfile = (profileInfo) => ({
   type: EDIT_USER_PROFILE,
   profileInfo,
});