import { Component, OnInit } from '@angular/core';
import urls from "../../environments/urls";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  home: string = urls.home;

  constructor() { }

  ngOnInit(): void {
  }

}
