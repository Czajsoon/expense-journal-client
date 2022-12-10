import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import Expense from "../models/Expense";
import {environment} from "../../environments/environment";
import Income from "../models/Income";

@Injectable({
  providedIn: 'root'
})
export class IncomeRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) { }

  addIncome(income: Income){
    income.dateTime = income.dateTime + ":00"
    return this.http.post(environment.apiUrl + "services-rest/receipt/income", income,{
      headers: this.headers.headers
    })
  }

  updateIncome(id: string, body:any){
    return this.http.patch(environment.apiUrl + "services-rest/receipt/income/" + id, body,{
      headers: this.headers.headers
    })
  }
}
