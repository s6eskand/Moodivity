import {
    AUTH_REGISTER,
    AUTH_LOGIN,
    STORE_TOKEN,
} from "../../constants/auth";

export const storeToken = (token, isAuthenticated) => ({
    type: STORE_TOKEN,
    isAuthenticated,
    token,
});

export const authRegister = (registerInfo) => ({
    type: AUTH_REGISTER,
    registerInfo,
});

export const authLogin = (loginInfo) => ({
    type: AUTH_LOGIN,
    loginInfo,
});