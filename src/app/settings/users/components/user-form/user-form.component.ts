import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { User } from '@models/user';


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {

  @Input() editMode = false;
  @Input() user: User;
  @Output() userAdded: EventEmitter<User> = new EventEmitter();
  @Output() userUpdated: EventEmitter<User> = new EventEmitter();
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
    this.userForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.userName, Validators.required]
    });
  }

  isDirty() {
    return this.userForm.dirty;
  }


  addUser() {
    this.userAdded.emit(this.userForm.value);
    this.userForm.reset();
  }

  updateUser() {
    this.userUpdated.emit(this.userForm.value);
    this.userForm.markAsPristine();
  }

}
