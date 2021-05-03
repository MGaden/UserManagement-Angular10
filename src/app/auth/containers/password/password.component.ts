import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../../services/password.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  public isFinished: boolean;
  public userId: string;
  public passwordForm: FormGroup;
  private code: string;
 resetPassword_Errors = [];
 
  constructor(
    private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.isFinished = false;
    this.userId = this.activeRoute.snapshot.queryParams.uid;
    this.code = this.activeRoute.snapshot.queryParams.code;

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  get f() { return this.passwordForm.controls; }

  setPassword() {
    this.resetPassword_Errors = [];
    let task: Observable<void>;
    task = this.passwordService.resetPassword({userId : this.userId , code : this.code , password : this.f.password.value , confirmPassword : this.f.confirmpassword.value});
    task.subscribe(res => console.log('HTTP response', res),
    err => {
      if (err.error != undefined && err.error.length > 0) {
        this.resetPassword_Errors = err.error;
      }
    },() => this.isFinished = true);
  }

}
