import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import {environment} from "../../environments/environment";
import PeriodType from "../models/PeriodType";
import ProductType from "../models/ProductType";

@Injectable({
  providedIn: 'root'
})
export class PeriodTypeRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) { }

  getPeriods(){
    return this.http.get<PeriodType[]>(environment.apiUrl + "services-rest/service/service-periods",{
      headers: this.headers.headers
    })
  }

  getProductType(){
    return this.http.get<ProductType[]>(environment.apiUrl + "services-rest/service/types", {
      headers: this.headers.headers
    })
  }
}
