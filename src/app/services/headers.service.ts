import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {HttpHeaders} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private cookieService: CookieService,
              private translate: TranslateService) {}

  get headers(){
    return {
      "Authorization": "Bearer " + this.cookieService.get("jwt"),
      "Accept-Language": this.translate.currentLang
    }
  }

  get languageHeaders(){
    return {
      "Accept-Language": this.translate.currentLang
    }
  }

  get tokenHeaders(){
    return {
      "Authorization": "Bearer " + this.cookieService.get("jwt")
    }
  }
}
