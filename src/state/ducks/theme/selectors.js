import { createSelector } from "reselect";

export const getTheme = createSelector([state => state.theme], theme => theme);
