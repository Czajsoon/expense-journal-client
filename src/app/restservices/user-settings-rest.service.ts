import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsRestService {

  constructor(private translate: TranslateService,
              private http: HttpClient,
              private headers: HeadersService) {
  }

  editUserDetails(body: any){
    return this.http.patch(environment.apiUrl + "services-rest/user-details", body, {
      headers: this.headers.headers
    })
  }

  changeEmail(body: any){
    return this.http.put<string>(environment.apiUrl + "services-rest/user-details/email", body, {
      headers: this.headers.headers
    })
  }

  changePassword(body: any){
    return this.http.put(environment.apiUrl + "services-rest/user-details/password", body,{
      headers: this.headers.headers
    })
  }
}
