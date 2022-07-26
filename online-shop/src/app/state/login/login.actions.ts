import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/login/user';

//login

export const login = createAction(
  '[loginModule] log user Action',
  props<{ username:string, password: string }>()
);

export const loginSuccess = createAction(
  '[loginModule] log user Success Action',
  props<{ username:string, password: string }>()
);

export const loginFail = createAction(
  '[loginModule] log user Fail Action',
  props<{ message: string }>()
);




