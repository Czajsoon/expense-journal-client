import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {HelpRestService} from "../restservices/help-rest.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  contactGroup: FormGroup;
  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              public auth: AuthService,
              private confirmationService: ConfirmationService,
              private translate: TranslateService,
              private helpRest: HelpRestService) {
    this.contactGroup = this.buildForm();
  }

  ngOnInit(): void {
  }

  send(){
    this.confirmationService.confirm({
      message: this.translate.instant("HELP.TOAST_TITLE"),
      accept: () => {
        this.helpRest.sendMessage(this.contactGroup.value);
        this.contactGroup = this.buildForm();
      }
    });
  }

  buildForm(){
    if (this.auth.logged){
      return this.fb.group({
        emailFrom: [this.auth.email, [Validators.required, Validators.email]],
        message: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(200)]],
        subject: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(50)]]
      })
    }
    else {
      return this.fb.group({
        emailFrom: ['', [Validators.required, Validators.email]],
        message: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(200)]],
        subject: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(50)]]
      })
    }
  }

}
