import {
    put,
    call,
    takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';

import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
} from "../../constants/auth";
import {
    SERVER,
} from "../../constants/endpoints";

import {
    CREATE_USER_PROFILE
} from "../../constants/profile";
import {
    createUserProfile,
} from "../../actions/profile";
import {
    storeOwner,
    storeToken,
} from "../../actions/auth";

function* postRequest(endpoint, data) {
    return yield axios.post(endpoint, data)
        .then(response => response);
}

function* logoutRequest() {
    return yield axios.post(SERVER.LOGOUT, {}, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    })
        .then(response => response);
}

function* authLogin(action) {
    try {
        const response = yield call(() => postRequest(SERVER.LOGIN, action.loginInfo));
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            yield put(storeOwner(response.data.user.id));
            yield put(storeToken(response.data.token, true))
        }
    } catch {
        console.log("Error")
    }
}

function* authRegister(action) {
    try {
        const response = yield call(() => postRequest(SERVER.REGISTER, action.registerInfo));
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            yield put(storeOwner(response.data.user.id));
            yield put(storeToken(response.data.token, true));
        }
    } catch {
        console.log("Error");
    }
}

function* authLogout(action) {
    try {
        const response = yield call(() => logoutRequest());
        localStorage.clear();
        yield put(storeToken(null, false));
    } catch {
        console.log("Error");
    }
}


export default function* authSagas() {
    yield takeLatest(AUTH_LOGIN, authLogin);
    yield takeLatest(AUTH_REGISTER, authRegister);
    yield takeLatest(AUTH_LOGOUT, authLogout);
}
