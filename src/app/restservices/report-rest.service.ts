import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import {environment} from "../../environments/environment";
import {Report} from "../models/Report";

@Injectable({
  providedIn: 'root'
})
export class ReportRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) { }

  getReport(month: string, year: string){
    return this.http.get<Report>(environment.apiUrl + "services-rest/report/" + month + "/" + year,{
      headers: this.headers.headers
    })
  }
}
