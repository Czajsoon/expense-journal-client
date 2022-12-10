import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AvatarRestService {

  constructor(private translate: TranslateService,
              private http: HttpClient,
              private headers: HeadersService) {
  }

  uploadAvatar(form: FormData){
    return this.http.post(environment.apiUrl + "services-rest/user-details/avatar", form,{
      headers: this.headers.headers
    })
  }
}
