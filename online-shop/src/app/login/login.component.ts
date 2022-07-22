
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../product/post';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


profileForm = this.fb.nonNullable.group({

    username: this.fb.control('', Validators.required),

    password: this.fb.control('',Validators.required),

}

);



constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) { }



ngOnInit(): void {

}

logIn(): void {



  if (this.profileForm.valid)

  {

    const username = this.profileForm.value.username || '';
    const password = this.profileForm.value.password || '';



  this.authService.login(username,password).subscribe(

      {

        next: () => {
          const redirectUrl = this.authService.redirectUrl || '/products';
          this.router.navigateByUrl(redirectUrl);

        },

        error: () => {},

      }
  );

  }

}

}