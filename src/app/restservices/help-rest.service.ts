import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {HeadersService} from "../services/headers.service";

@Injectable({
  providedIn: 'root'
})
export class HelpRestService {

  constructor(private messageService: MessageService,
              private translate: TranslateService,
              private headers: HeadersService,
              private http: HttpClient) { }

  sendMessage(content: any){
    this.http.post(environment.apiUrl + "services-rest/mailer", content, {
      headers: this.headers.languageHeaders
    })
      .subscribe(() =>{
        this.messageService.add({
          severity:'success',
          summary: this.translate.instant("HELP.TOAST_SUMMARY"),
          detail: this.translate.instant("HELP.TOAST_DETAIL")}
        );

      }, error => {
        this.messageService.add({
          severity:'error',
          summary: this.translate.instant("ERROR"),
          detail: error.error}
        );
      })
  }
}
