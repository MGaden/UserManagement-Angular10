import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../auth.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signUp_Errors : [];

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username : [''],
      email: ['',Validators.email],
      password: [''],
      confirmpassword: ['']
    });
  }

  get f() { return this.signupForm.controls; }

  signup() {

    this.signUp_Errors = [];

    this.authService.signup(
      {
        userName : this.f.username.value,
        email: this.f.email.value,
        password: this.f.password.value,
        confirmPassword : this.f.confirmpassword.value
      }
    ).subscribe(res => console.log('HTTP response', res),
    err => {
      if (err.error != undefined && err.error.length > 0) {
        this.signUp_Errors = err.error;
      }
    },() => this.router.navigate([this.authService.LOGIN_PATH]));
  }

}
