import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import {environment} from "../../environments/environment";
import ProductsTable from "../models/ProductsTable";
import Product from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) { }

  addProduct(body: any){
    return this.http.post(environment.apiUrl + "services-rest/service", body, {
      headers: this.headers.headers
    })
  }

  getProduct(id: string){
    return this.http.get<Product>(environment.apiUrl + "services-rest/service/" + id,{
      headers: this.headers.headers
    })
  }

  getActiveProducts(size: number, page: number, body: any){
    return this.http.post<ProductsTable>(environment.apiUrl + "services-rest/service/search",body, {
      params: this.getParams(size, page),
      headers: this.headers.headers
    })
  }

  updateProduct(body: any, id: string){
    return this.http.patch(environment.apiUrl + "services-rest/service/" + id, body,{
      headers: this.headers.headers
    })
  }

  deleteProduct(id: string){
    return this.http.delete(environment.apiUrl + "services-rest/service/" + id, {
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
