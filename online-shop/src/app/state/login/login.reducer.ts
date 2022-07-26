import { createReducer, on } from '@ngrx/store';
import { Status } from '../data';
import { login, loginSuccess, loginFail } from '../login/login.actions';

export interface UserState {
  status: Status;
  username: string;
  password: string;
}

const initialState: UserState = {
  status: 'initial',
  username: '',
  password: '',
};

export const productReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loginSuccess, (state, { username, password }) => ({
    ...state,
    username : username,
    password : password,
    status: 'ready',
  })),
  on(loginFail, (state, { message }) => ({
    ...state,
    status: 'error',
  }))
);
