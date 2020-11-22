import {
    put,
    call,
    takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';

import {
    storeUserProfile
} from "../../actions/profile";

import {
    GET_USER_PROFILE,
    EDIT_USER_PROFILE,
    CREATE_USER_PROFILE,
} from "../../constants/profile";
import {
    SERVER
} from "../../constants/endpoints";

const headers = {
    "Authorization": `Token ${localStorage.getItem('token')}`
};

function* getRequest(endpoint) {
    return yield axios.get(endpoint, {
        headers: headers
    })
        .then(response => response)
}

function* postRequest(endpoint, data) {
    return yield axios.post(endpoint, data, {
        headers: headers
    })
        .then(response => response)
}

function* putRequest(endpoint, data) {
    return yield axios.put(endpoint, data, {
        headers: headers
    })
        .then(response => response);
}

function* getUserProfile(action) {
    try {
        const response = yield call(() => getRequest(SERVER.PROFILE));
        if (response.data.length !== 0) {
            yield put(storeUserProfile(response.data[0]))
        }
    } catch {
        console.log('Error')
    }
}

function* createUserProfile(action) {
    try {
        const response = yield call(() => postRequest(SERVER.PROFILE, action.profileInfo));
        yield put(storeUserProfile(response.data))
    } catch {
        console.log('Error')
    }
}

function* editUserProfile(action) {
    try {
        const response = yield call(() => putRequest(`${SERVER.EDIT_PROFILE}/${action.profileInfo.id}/`, action.profileInfo));
        yield put(storeUserProfile(response.data))
    } catch {
        console.log('Error')
    }
}

export default function* profileSagas() {
    yield takeLatest(GET_USER_PROFILE, getUserProfile);
    yield takeLatest(CREATE_USER_PROFILE, createUserProfile);
    yield takeLatest(EDIT_USER_PROFILE, editUserProfile);
}