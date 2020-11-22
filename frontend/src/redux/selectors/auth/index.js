import {
    createSelector
} from 'reselect';

export const isAuthenticatedSelector = createSelector(state => state && state.auth && state.auth.isAuthenticated, isAuthenticatedSelector => isAuthenticatedSelector);
export const ownerSelector = createSelector(state => state && state.auth && state.auth.owner, ownerSelector => ownerSelector);
