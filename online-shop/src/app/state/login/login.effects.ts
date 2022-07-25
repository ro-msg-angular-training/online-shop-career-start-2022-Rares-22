import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import * as LoginActions from './login.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((username,password) => LoginActions.loginSuccess()),
          catchError(() => of(LoginActions.loginFail({message: 'fail to log in'})))
        );
      })
    );
  });
}
