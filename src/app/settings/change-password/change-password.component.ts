import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageToastService} from "../../shared/message-toast.service";
import {UserSettingsRestService} from "../../restservices/user-settings-rest.service";
import {MustMatch} from "../../shared/must-match";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordGroup: FormGroup;
  display: boolean = false;

  constructor(private fb: FormBuilder,
              private messageService: MessageToastService,
              private settingsRest: UserSettingsRestService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.passwordGroup = this.fb.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
      repeatedPassword: [null, Validators.required]
    },{
      validators: MustMatch('newPassword', 'repeatedPassword')
    })
  }

  show(){
    this.display = true;
  }

  hide(){
    this.display = false;
    this.passwordGroup.reset();
  }

  changePassword() {
    this.settingsRest.changePassword(this.passwordGroup.value).subscribe((res:any)=>{
      this.messageService.successToast(res.message);
    },error =>{
      this.messageService.errorToast(error.error);
    })
  }
}
