import {
    createSelector
} from "reselect";

export const userProfileSelector = createSelector(state => state && state.profile && state.profile.userProfile, userProfileSelector => userProfileSelector);
export const hasBeenCreatedSelector = createSelector(state => state && state.profile && state.profile.hasBeenCreated, hasBeenMadeSelector => hasBeenMadeSelector);