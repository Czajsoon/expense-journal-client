import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import {environment} from "../../environments/environment";
import Method from "../models/Method";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) { }

  getActivePaymentMethods(){
   return this.http.get<Method[]>(environment.apiUrl + "services-rest/payment-method/active",{
     headers: this.headers.headers
   })
  }

  getPaymentMethods(){
    return this.http.get<Method[]>(environment.apiUrl + "services-rest/payment-method",{
      headers: this.headers.headers
    })
  }

  edit(id: string, name: string){
    return this.http.patch(environment.apiUrl + "services-rest/payment-method",{methodId: id, name: name},{
      headers: this.headers.headers
    })
  }

  delete(id: string){
    return this.http.delete(environment.apiUrl + "services-rest/payment-method/" + id,{
      headers: this.headers.headers
    })
  }

  add(object: any){
    return this.http.post(environment.apiUrl + "services-rest/payment-method", object, {
      headers: this.headers.headers
    })
  }
}
