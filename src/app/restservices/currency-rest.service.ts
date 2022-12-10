import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import Currency from "../models/Currency";
import {environment} from "../../environments/environment";
import {HeadersService} from "../services/headers.service";

@Injectable({
  providedIn: 'root'
})
export class CurrencyRestService {

  constructor(private translate: TranslateService,
              private http: HttpClient,
              private headers: HeadersService) {
  }

  getCurrencies() {
    return this.http.get<Currency[]>(environment.apiUrl + "services-rest/currency/available",{
      headers: this.headers.languageHeaders
    })
  }

  getCurrency(currencyCode: string){
    return this.http.get<Currency>(environment.apiUrl + "services-rest/currency/" + currencyCode, {
      headers: this.headers.headers
    })
  }
}
