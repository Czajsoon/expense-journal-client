import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {AvatarDialogComponent} from "./avatar-dialog/avatar-dialog.component";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserSettingsRestService} from "../restservices/user-settings-rest.service";
import {MessageToastService} from "../shared/message-toast.service";
import {ChangeEmailComponent} from "./change-email/change-email.component";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import urls from "../../environments/urls";
import {LoginRestService} from "../restservices/login-rest.service";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @ViewChild(AvatarDialogComponent, {static: true}) avatarDialog: AvatarDialogComponent;
  @ViewChild(ChangeEmailComponent, {static: true}) changeEmail: ChangeEmailComponent;
  @ViewChild(ChangePasswordComponent, {static: true}) chanePassword: ChangePasswordComponent;
  userDetails: FormGroup;
  userAvatar: string;

  constructor(public auth: AuthService,
              private fb: FormBuilder,
              private loginRest: LoginRestService,
              private router: Router,
              private userDetailsRest: UserSettingsRestService,
              private messageService: MessageToastService) {
    this.buildForm();
    this.getAvatar();
  }

  getAvatar(){
    this.userAvatar = this.auth.avatarUrl
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.userDetails = this.fb.group({
      name: [this.auth.name, Validators.required],
      lastname: [this.auth.lastname, Validators.required],
      companyName: [this.auth.companyName, Validators.required]
    })
  }

  showAvatarDialog(){
    this.avatarDialog.show();
  }

  showEmailDialog(){
    this.changeEmail.show();
  }

  showPasswordDialog(){
    this.chanePassword.show();
  }

  save() {
    this.userDetailsRest.editUserDetails(this.userDetails.value).subscribe(() =>{
      this.loginRest.userDetails();
      // this.router.navigate([urls.settings]);
      this.messageService.successToastWithTranslation('SETTINGS.CHANGED');
    },error => {
      this.messageService.errorToast(error.error);
    })
  }
}
