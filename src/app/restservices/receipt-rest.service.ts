import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import Receipt from "../models/Receipt";
import {environment} from "../../environments/environment";
import ReceiptResponse from "../models/ReceiptResponse";
import IExpenseView from "../models/ExpenseView";
import SearchReceiptQuery from "../models/SearchReceiptQuery";
import IIncomeView from "../models/IncomeView";
import Income from "../models/Income";
import {Balance} from "../models/Balance";

@Injectable({
  providedIn: 'root'
})
export class ReceiptRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) { }

  getReceipts(size: number, page: number, body: SearchReceiptQuery){
    return this.http.post<ReceiptResponse>(environment.apiUrl + "services-rest/receipt/find", body,{
      headers: this.headers.headers,
      params: this.getParams(size, page)
    })
  }

  getReceipt(id: string){
    return this.http.get<IExpenseView>(environment.apiUrl + "services-rest/receipt/expense/" + id, {
      headers: this.headers.headers
    })
  }

  getBalance(){
    return this.http.get<Balance>(environment.apiUrl + "services-rest/receipt/balance", {
      headers: this.headers.headers
    })
  }

  getIncome(id: string){
    return this.http.get<IIncomeView>(environment.apiUrl + "services-rest/receipt/income/" + id, {
      headers: this.headers.headers
    })
  }

  deleteReceipt(id: string){
    return this.http.delete(environment.apiUrl + "services-rest/receipt/" + id,{
      headers: this.headers.headers
    })
  }

  private getParams(size: number, page: number){
    return {
      size: size,
      page: page
    }
  }
}
