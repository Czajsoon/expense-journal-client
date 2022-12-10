import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Expense from "../models/Expense";
import {environment} from "../../environments/environment";
import {HeadersService} from "../services/headers.service";

@Injectable({
  providedIn: 'root'
})
export class ExpenseRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) {
  }

  addExpense(expense: Expense){
    expense.dateTime = expense.dateTime + ":00"
    return this.http.post(environment.apiUrl + "services-rest/receipt/expense", expense,{
      headers: this.headers.headers
    })
  }

  editExpense(expense: Expense, id: string){
    return this.http.patch(environment.apiUrl + "services-rest/receipt/expense/" + id, expense,{
      headers: this.headers.headers
    })
  }
}
