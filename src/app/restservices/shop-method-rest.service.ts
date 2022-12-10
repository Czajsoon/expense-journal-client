import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeadersService} from "../services/headers.service";
import {environment} from "../../environments/environment";
import Method from "../models/Method";

@Injectable({
  providedIn: 'root'
})
export class ShopMethodRestService {

  constructor(private http: HttpClient,
              private headers: HeadersService) {
  }

  getActiveShopMethods() {
    return this.http.get<Method[]>(environment.apiUrl + "services-rest/shop-method/active", {
      headers: this.headers.headers
    })
  }

  getShopMethods() {
    return this.http.get<Method[]>(environment.apiUrl + "services-rest/shop-method", {
      headers: this.headers.headers
    })
  }

  edit(id: string, name: string){
    return this.http.patch(environment.apiUrl + "services-rest/shop-method",{methodId: id, name: name},{
      headers: this.headers.headers
    })
  }

  delete(id: string){
    return this.http.delete(environment.apiUrl + "services-rest/shop-method/" + id,{
      headers: this.headers.headers
    })
  }

  add(object: any){
    return this.http.post(environment.apiUrl + "services-rest/shop-method", object, {
      headers: this.headers.headers
    })
  }
}
