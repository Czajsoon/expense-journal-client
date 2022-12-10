import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUpload} from "primeng/fileupload";
import {AvatarRestService} from "../../restservices/avatar-rest.service";
import {MessageToastService} from "../../shared/message-toast.service";
import {LoginRestService} from "../../restservices/login-rest.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {
  display: boolean = false;
  uploadedFiles: any[] = [];
  @ViewChild('fileUpload') fileUpload: FileUpload;
  selectedFile: string = null;

  constructor(private avatarRest: AvatarRestService,
              private auth: AuthService,
              private loginRest: LoginRestService,
              private messageService: MessageToastService) {
  }

  ngOnInit(): void {
  }

  hide() {
    this.display = false;
  }

  show() {
    this.display = true;
  }

  changeAvatar(){
    const formData = new FormData();
    formData.append('image', this.selectedFile)
    this.avatarRest.uploadAvatar(formData).subscribe(() =>{
      this.messageService.successToastWithTranslation('SETTINGS.AVATAR.AVATAR_UPLOADED');
      this.auth.refreshAvatar();
    },error => {
      this.messageService.errorToast(error.error);
    });
  }

  onBasicUpload(event: any) {
    this.selectedFile = event.target.files[0];
  }
}

