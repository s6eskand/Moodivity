import {
    put,
    call,
    takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';

import {
    AUTH_LOGIN,
    AUTH_REGISTER,
} from "../../constants/auth";
import {
    SERVER,
} from "../../constants/endpoints";

import {
    storeToken,
} from "../../actions/auth";

function* postRequest(endpoint, data) {
    return yield axios.post(endpoint, data)
        .then(response => response);
}

function* authLogin(action) {
    try {
        const response = yield call(() => postRequest(postRequest(SERVER.LOGIN, action.loginInfo)));
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            yield put(storeToken(response.data.token, true))
        }
    } catch {
        console.log("Error")
    }
}

function* authRegister(action) {
    try {
        const response = yield call(() => postRequest(postRequest(SERVER.REGISTER, action.registerInfo)));
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            yield put(storeToken(response.data.token, true))
        }
    } catch {
        console.log("Error")
    }
}

export default function* authSagas() {
    yield takeLatest(AUTH_LOGIN, authLogin);
    yield takeLatest(AUTH_REGISTER, authRegister);
}
