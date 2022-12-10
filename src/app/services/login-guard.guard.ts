import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import urls from "../../environments/urls";
import {CookieService} from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private cookieService: CookieService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.auth.logged && (this.cookieService.get('jwt') == undefined || this.cookieService.get('jwt') == null)) {
      this.router.navigateByUrl(urls.unauthorized);
      return false;
    }
    return true;
  }

}
