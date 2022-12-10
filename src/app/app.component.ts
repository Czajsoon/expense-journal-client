import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "./services/auth.service";
import {CookieService} from "ngx-cookie";
import {LoginRestService} from "./restservices/login-rest.service";
import {LoadingService} from "./services/loading.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'expenseJournal';
  showFiller = false;
  loading$ = this.loader.loading$;

  constructor(private primengConfig: PrimeNGConfig,
              public translate: TranslateService,
              public auth: AuthService,
              private cookieService: CookieService,
              private loginRest: LoginRestService,
              public loader: LoadingService,
              private router: Router) {
    translate.addLangs(["pl", "en"])
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
    this.loadUserWhenTokenIsAvailable();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.events.subscribe((routerEvent) => this.checkRouterEvent(routerEvent))
  }

  loadUserWhenTokenIsAvailable(){
    if (this.cookieService.get("jwt") != undefined){
      this.loginRest.userDetails();
    }
  }

  private checkRouterEvent(routerEvent) {
    if (routerEvent instanceof NavigationStart){
      this.loader.show();
    }
    else if (routerEvent instanceof NavigationEnd ||
    routerEvent instanceof NavigationCancel ||
    routerEvent instanceof NavigationError){
      this.loader.hide();
    }
  }
}
