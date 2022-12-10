import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as http from "http";
import {MessageService} from "primeng/api";
import {AuthService} from "../services/auth.service";
import {CookieService} from "ngx-cookie";
import {HeadersService} from "../services/headers.service";
import Account from '../models/Account';
import {Router} from "@angular/router";
import urls from "../../environments/urls";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoginRestService {

  constructor(private translate: TranslateService,
              private http: HttpClient,
              private auth: AuthService,
              private headersService: HeadersService,
              private cookieService: CookieService,
              private router: Router,
              private messageService: MessageService) { }

  login(username: string, password: string){
    this.http.post(environment.apiUrl + "services-rest/authenticate/login",
      {username: username, password: password},{
        headers: this.headersService.languageHeaders
    }).toPromise()
      .then((res:any) => {
        this.cookieService.put('jwt', res.jwtToken)
        this.userDetailsForLogin()
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('LOGIN.ERROR'),
          detail: error.error
        })});
  }

  userDetails(){
    this.http.get(environment.apiUrl + "services-rest/user-details", {
      headers: this.headersService.headers
    }
      ).subscribe((res: Account) => {
        this.auth.setUser(res);
      })
  }

  userDetailsRest(){
    return this.http.get(environment.apiUrl + "services-rest/user-details", {
        headers: this.headersService.headers
      }
    );
  }

  private userDetailsForLogin(){
    this.http.get(environment.apiUrl + "services-rest/user-details", {
        headers: this.headersService.headers
      }
    ).subscribe((res: Account) => {
      this.auth.setUser(res);
      this.router.navigate([urls.journal]);
    })
  }

  userAvatar(){
    return this.http.get(environment.apiUrl + "services-rest/user-details/avatar", {
      headers: this.headersService.tokenHeaders
    })
  }
}
