import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { User } from '@models/user';


@Component({
  selector: 'Role-form',
  templateUrl: './Role-form.component.html',
  styleUrls: ['./Role-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleFormComponent implements OnInit {

  @Input() editMode = false;
  @Input() Role: User;
  @Output() RoleAdded: EventEmitter<User> = new EventEmitter();
  @Output() RoleUpdated: EventEmitter<User> = new EventEmitter();
  RoleForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
    this.RoleForm = this.fb.group({
      id: [this.Role.id],
      name: [this.Role.userName, Validators.required]
    });
  }

  isDirty() {
    return this.RoleForm.dirty;
  }


  addRole() {
    this.RoleAdded.emit(this.RoleForm.value);
    this.RoleForm.reset();
  }

  updateRole() {
    this.RoleUpdated.emit(this.RoleForm.value);
    this.RoleForm.markAsPristine();
  }

}
