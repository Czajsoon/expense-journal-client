import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.route.paramMap.subscribe((params: ParamMap) => {
        if (params.get('message') != null && params.get('message').match('password-changed')){
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('CHANGED_PASSWORD_TITLE'),
            detail: this.translate.instant('CHANGED_PASSWORD')
          })
        }
        if (params.get('message') != null && params.get('message').match('email-changed')){
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('CHANGED_EMAIL_TITLE'),
            detail: this.translate.instant('CHANGED_EMAIL')
          })
        }
      });
    },300)
  }

}
