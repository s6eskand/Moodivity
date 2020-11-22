import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';
import axios from 'axios';

import {
    storeUserLogs,
    setLoading
} from "../../actions/logs";

import {
    GET_USER_LOGS,
    CREATE_USER_LOG,
} from "../../constants/logs";
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

function* getUserLogs(action) {
    try {
        const response = yield call(() => getRequest(SERVER.LOGS));
        yield put(storeUserLogs(response.data))
    } catch {
        console.log("Error")
    }
}

function* createUserLog(action) {
    yield put(setLoading(true));
    try {
        const response = yield call(() => postRequest(SERVER.LOGS, action.logInfo));
        yield call(getUserLogs);
    } catch {
        console.log("Error")
    }
    yield put(setLoading(false));
}

export default function* logsSagas() {
    yield takeLatest(GET_USER_LOGS, getUserLogs);
    yield takeLatest(CREATE_USER_LOG, createUserLog);
}