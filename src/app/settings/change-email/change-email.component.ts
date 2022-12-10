import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {MessageToastService} from "../../shared/message-toast.service";
import {UserSettingsRestService} from "../../restservices/user-settings-rest.service";

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {

  display: boolean = false;
  emailGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private messageService: MessageToastService,
              private settingsRest: UserSettingsRestService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(){
    this.emailGroup = this.fb.group({
      newEmail: [null, [Validators.email,Validators.required]]
    })
  }

  changeEmail(){
    this.settingsRest.changeEmail(this.emailGroup.value).toPromise().then((res) => {
      this.messageService.successToastWithTranslation('SETTINGS.EMAIL.SUCCESS');
      this.hide();
    }).catch(error =>{
      this.messageService.successToastWithTranslation('SETTINGS.EMAIL.SUCCESS');
      this.hide();
    });
  }

  hide() {
    this.display = false;
    this.emailGroup.reset();
  }

  show(){
    this.display = true;
  }
}
