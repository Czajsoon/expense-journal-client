import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import urls from "../../../environments/urls";

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  display: boolean = false;
  date: Date;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  hide() {
    this.display = false;
    this.date = null;
  }

  show(){
    this.display = true;
  }

  generate(){
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.router.navigate([urls.report,month, year]).then(() => this.hide())
  }
}
