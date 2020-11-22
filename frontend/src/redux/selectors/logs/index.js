import {
    createSelector
} from "reselect";

export const loadingSelector = createSelector(state => state && state.logs && state.logs.loading, loadingSelector => loadingSelector);
export const goalStatusSelector = createSelector(state => state && state.logs && state.logs.goalStatus, goalStatusSelector => goalStatusSelector);
export const userLogsSelector = createSelector(state => state && state.logs && state.logs.userLogs, userLogsSelector => userLogsSelector);
