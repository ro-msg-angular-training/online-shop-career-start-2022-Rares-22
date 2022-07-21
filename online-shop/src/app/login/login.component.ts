import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    user : User = {username:'', password:'', fullName:'',roles:['']};
  

  profileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.nullValidator]],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  submit(): void {
    this.user.username = this.profileForm.value.username || '{}';
    this.user.password = this.profileForm.value.password || '{}';
    this.http.get(`http://localhost:3000/login`).subscribe((data) => (this.user = data as User));
    //if(this.user) return true;
   // return false;
  }

  login() {
   // const ok: boolean = this.submit();

   // if(ok == true )  

  }
}
