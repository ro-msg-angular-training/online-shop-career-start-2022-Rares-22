import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../product/post';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { User } from './user';
import { Actions, ofType } from '@ngrx/effects';
import { login } from '../state/login/login.actions';
import { Subscription } from 'rxjs';
import * as LoginActions from '../state/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  loginSuccess= new Subscription();
  loginFail=  new Subscription();

  profileForm = this.fb.nonNullable.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private actions: Actions,
  ) {}
  user: User = { username: '', password: '', fullName: '', roles: [''] };
  ngOnInit(): void {
    this.loginSuccess = this.actions
      .pipe(ofType(LoginActions.loginSuccess))
      .subscribe(() => {
        this.router.navigateByUrl(this.authService.redirectUrl ?? '/products');
      });

    this.loginFail = this.actions
      .pipe(ofType(LoginActions.loginFail))
      .subscribe(() => alert('Failed to log in!'));
  }

  logIn(): void {
    if (this.profileForm.valid) {
      const username = this.profileForm.value.username || '';

      const password = this.profileForm.value.password || '';

      this.store.dispatch(login({ username: username, password: password }));
      
    }
  }
}
