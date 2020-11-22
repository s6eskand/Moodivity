import {
    STORE_USER_LOGS,
    GET_USER_LOGS,
    CREATE_USER_LOG, SET_LOADING, SET_GOAL_STATUS,
} from "../../constants/logs";

export const storeUserLogs = (userLogs) => ({
    type: STORE_USER_LOGS,
    userLogs,
});

export const getUserLogs = () => ({
    type: GET_USER_LOGS,
});

export const createUserLog = (logInfo) => ({
    type: CREATE_USER_LOG,
    logInfo,
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    loading,
});

export const setGoalStatus = (time) => ({
    type: SET_GOAL_STATUS,
    time,
});