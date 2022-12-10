import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class MessageToastService {

  constructor(private messageService: MessageService,
              private translate: TranslateService) { }

  successToast(successMessage: string){
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('SUCCESS'),
      detail: successMessage,
      life: 5000
    })
  }

  successToastWithTranslation(messageTranslationCode: string){
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('SUCCESS'),
      detail: this.translate.instant(messageTranslationCode),
      life: 5000
    })
  }

  errorToast(errorMessage: string){
    this.messageService.add({
      severity: 'error',
      summary: this.translate.instant('ERROR'),
      detail: errorMessage,
      life: 5000
    })
  }

  errorToastWithTranslation(messageTranslationCode: string){
    this.messageService.add({
      severity: 'error',
      summary: this.translate.instant('ERROR'),
      detail: this.translate.instant(messageTranslationCode),
      life: 5000
    })
  }
}
