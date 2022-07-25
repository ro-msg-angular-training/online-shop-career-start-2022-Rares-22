import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const LoginState = (state: AppState) => state.login;

export const selectLoggedInUser = createSelector(LoginState, (state) => state.username);

export const isLoggedIn = createSelector(LoginState, (state) => state.username !== null);
