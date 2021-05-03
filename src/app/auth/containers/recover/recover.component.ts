import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  isRequestSent: boolean;
  public recoveryForm: FormGroup;
  recovery_Errors : []
  
  constructor(private formBuilder: FormBuilder,
    private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.isRequestSent = false;
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.recoveryForm.controls; }

  recover() {

    this.recovery_Errors = [];
    this.passwordService.requestRecovery({ email : this.f.email.value })
      .subscribe(res => console.log('HTTP response', res),
      err => {
        if (err.error != undefined && err.error.length > 0) {
          this.recovery_Errors = err.error;
        }
      },() => this.isRequestSent = true);
  }

}
