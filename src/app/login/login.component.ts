import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRestService} from "../restservices/login-rest.service";
import urls from "../../environments/urls";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit  {
  visibility = false;
  loginGroup: FormGroup;
  public registerUrl: string = urls.register;
  constructor(private fb: FormBuilder,
              public translate: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              private loginRest: LoginRestService,
              private messageService: MessageService) {
    this.loginGroup = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {

  }

  visibility_change(){
    this.visibility ? this.visibility = false : this.visibility = true;
  }

  login(){
    this.loginRest.login(this.loginGroup.get("login").value, this.loginGroup.get("password").value);
  }

  goToRegister() {
    this.router.navigate([urls.register]);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.route.paramMap.subscribe((params: ParamMap) => {
        if (params.get('confirmationSuccess') != null){
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('ACCOUNT.ACTIVATION_SUCCESS.SUMMARY'),
            detail: this.translate.instant('ACCOUNT.ACTIVATION_SUCCESS.DETAIL')
          })
        }
      });
    },300)
  }

}
