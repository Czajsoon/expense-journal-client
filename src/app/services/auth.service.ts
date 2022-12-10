import { Injectable } from '@angular/core';
import Account from '../models/Account';
import {CookieService} from "ngx-cookie";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: Account = null;
  private  _logged: boolean = false;
  private _avatarUrl: string = environment.apiUrl + "services-rest/user-details/avatar/"

  constructor(private cookieService: CookieService) {}

  get login(){
    return this._user.login;
  }

  get name(){
    return this._user.name;
  }

  get lastname(){
    return this._user.lastname;
  }

  get email(){
    return this._user.email;
  }

  get companyName(){
    return this._user.companyName;
  }

  get defaultCurrency(){
    return this._user.defaultCurrencyCode;
  }

  setUser(user: Account){
    this._user = user;
    this.logged = true;
    this._avatarUrl = environment.apiUrl + "services-rest/user-details/avatar/" + this._user.login
  }

  get user(){
    return this._user;
  }

  get avatarUrl(): string{
    return this._avatarUrl;
  }

  refreshAvatar(){
    this._avatarUrl = environment.apiUrl + "services-rest/user-details/avatar/" + this._user.login + '?' + (new Date()).getTime()
  }

  set logged(state: boolean){
    this._logged = state;
  }

  get logged() {
    return this._logged;
  }

  logout(){
    this.cookieService.removeAll()
    this._logged = false;
    this._user = null;
  }
}


