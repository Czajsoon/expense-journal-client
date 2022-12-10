import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../shared/must-match";
import {CurrencyRestService} from "../restservices/currency-rest.service";
import Currency from "../models/Currency";
import {Observable} from "rxjs";
import {RegisterRestService} from "../restservices/register-rest.service";
import {Router} from "@angular/router";
import urls from "../../environments/urls";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerGroup: FormGroup;
  public currencies: string[];
  private currenciesObjects: Currency[];
  visibility = false;
  visibilityRepeat = false;

  constructor(private translate: TranslateService,
              private fb: FormBuilder,
              private currencyRest: CurrencyRestService,
              private router: Router,
              private registerRest: RegisterRestService) {
    this.registerGroup = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(5)]],
      name: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      companyName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      defaultCurrencyCode: ['',[Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required,Validators.minLength(8)]],
    },{
      validator: MustMatch('password', 'repeatPassword')
    });
    this.currencyRest.getCurrencies()
      .subscribe((currencies: Currency[]) => {
        this.currenciesObjects = currencies;
        this.currencies = this.currenciesObjects.map(cur => cur.currencyCode)
      })
  }

  ngOnInit(): void {
  }

  visibility_change() {
    this.visibility ? this.visibility = false : this.visibility = true;
  }

  visibilityRepeat_change() {
    this.visibilityRepeat ? this.visibilityRepeat = false : this.visibilityRepeat = true;
  }

  register() {
    this.registerRest.register(this.registerGroup.value, this.registerGroup)
  }

  goToLogin(){
    this.router.navigate([urls.login])
  }
}
