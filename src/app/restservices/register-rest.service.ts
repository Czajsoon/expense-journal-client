import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {HeadersService} from "../services/headers.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {environment} from "../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RegisterRestService {

  constructor(private translate: TranslateService,
              private http: HttpClient,
              private auth: AuthService,
              private headersService: HeadersService,
              private router: Router,
              private messageService: MessageService) {
  }

  register(register: any, formGroup: FormGroup) {
    this.http.post(environment.apiUrl + "services-rest/authenticate/register", register, {
      headers: this.headersService.languageHeaders
    }).toPromise().then((res: any) => {
      this.messageService.add({
        severity: 'success',
        summary: this.translate.instant('REGISTER.SUCCESS'),
        detail: res.message,
        life: 5000
      });
      formGroup.reset();
    }).catch(error => {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('REGISTER.ERROR'),
        detail: error.error,
        life: 5000
      })
    })
  }
}
