import { Component, OnInit } from '@angular/core';
import urls from "../../environments/urls";

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPAgeComponent implements OnInit {

  login: string = urls.login;
  register: string = urls.register;
  home: string = urls.home;

  constructor() { }

  ngOnInit(): void {
  }

}
