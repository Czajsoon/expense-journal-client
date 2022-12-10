import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import urls from "../../../environments/urls";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: urls.home},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'}
    ];
    this.activeItem = this.items[0];

  }

}
