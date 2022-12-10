import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import urls from "../../environments/urls";
import {Router} from "@angular/router";
import Account from '../models/Account';
import {matDrawerAnimations} from "@angular/material/sidenav";
import {AuthService} from "../services/auth.service";
import {MenuItem} from "primeng/api";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public homeUrl: string = urls.home;
  public languagesUrl: string = urls.language;
  public settingsUrl: string = urls.settings;
  public helpUrl: string = urls.help;
  public journalUrl: string = urls.journal;
  public loginUrl: string = urls.login;
  public registerUrl: string = urls.register;
  public drawer: any;

  @Input() account: Account;
  @Input() logged: boolean;

  constructor(public translate: TranslateService,
              private router: Router,
              public auth: AuthService) {
    console.log(this.logged)
  }

  ngOnInit(): void {
    console.log(this.logged)
  }

  goToLanguageSelector() {
    this.router.navigate([urls.language]);
  }

  goToHome() {
    this.router.navigate([urls.home]);
  }

  goToHelp() {
    this.router.navigate([urls.help]);
  }

  goToJournal() {
    this.router.navigate([urls.journal]);
  }

  goToLogin() {
    this.router.navigate([urls.login]);
  }

  goToRegister() {
    this.router.navigate([urls.register]);
  }

  logOut() {
    this.router.navigate([urls.home]);
    this.auth.logout();
  }


  goToSettings() {
    this.router.navigate([urls.settings]);
  }
}
