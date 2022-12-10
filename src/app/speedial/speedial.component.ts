import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";
import urls from "../../environments/urls";
import {AuthService} from "../services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {strict} from "assert";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ReportDialogComponent} from "../report/report-dialog/report-dialog.component";

@Component({
  selector: 'app-speedial',
  templateUrl: './speedial.component.html',
  styleUrls: ['./speedial.component.scss']
})
export class SpeedialComponent implements OnInit {
  dashboardNavigationItems: MenuItem[] =[];
  displayModal: boolean;
  height: string;
  shopMethods: string = '';
  paymentMethods: string = '';
  addReceipt: string = '';
  report: string = '';
  journal: string = '';

  @ViewChild(ReportDialogComponent,{static: true}) reportDialog: ReportDialogComponent;
  @Input() logged: boolean;

  constructor(private router: Router,
              private auth: AuthService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.routerSpeedDial()
  }

  private routerSpeedDial(){
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.setUpSpeedDial(val.url)
      }
    })
  }

  private setUpSpeedDial(url: string): void{
    switch (url){
      case urls.journal:{
        this.dashboardNavigationItems = this.setMenu()
        break;
      }
      case urls.shopMethods: {
        this.dashboardNavigationItems = this.setMenu()
        break;
      }
      case urls.paymentMethods: {
        this.dashboardNavigationItems = this.setMenu()
        break;
      }
      case urls.receipt: {
        this.dashboardNavigationItems = this.setMenu()
        break;
      }
      case urls.warehouse: {
        this.dashboardNavigationItems = this.setMenu()
        break;
      }
      case urls.addProduct: {
        this.dashboardNavigationItems = this.setMenu()
        break;
      }
      default: {
        this.dashboardNavigationItems = this.setOtherPage()
        break;
      }
    }
    if (url.startsWith(urls.expenseEdit)){
      this.dashboardNavigationItems = this.setMenu()
    }
    if (url.startsWith(urls.editProduct)){
      this.dashboardNavigationItems = this.setMenu()
    }
    if (url.startsWith(urls.incomeEdit)){
      this.dashboardNavigationItems = this.setMenu()
    }
    if (url.startsWith(urls.report)){
      this.dashboardNavigationItems = this.setMenu()
    }
  }

  private setMenu() {
    this.height = "410px"
    return [
      {
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate([urls.receipt])
        }
      },
      {
        icon: 'pi pi-wallet',
        command: () => {
          this.router.navigate([urls.paymentMethods])
        },
      },
      {
        icon: 'pi pi-shopping-cart',
        command: () => {
          this.router.navigate([urls.shopMethods])
        },
      },
      {
        icon: 'pi pi-briefcase',
        tooltipOptions: {
          tooltipLabel: this.report,
          position: "left"
        },
        command: () => {
          this.reportDialog.show(); //todo when implemented
        },
      },
      {
        icon: 'pi pi-book',
        command: () => {
          this.router.navigate([urls.journal])
        },
      },
      {
        icon: 'pi pi-database',
        command: () => {
          this.router.navigate([urls.warehouse])
        },
      }
    ];
  }

  private setOtherPage(){
    this.height = "350px";
    return [
      {
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate([urls.home])
        }
      },
      {
        icon: 'pi pi-book',
        command: () => {
          this.router.navigate([urls.journal])
        }
      },
      {
        icon: 'pi pi-language',
        command: () => {
          this.router.navigate([urls.language])
        }
      },
      {
        icon: 'pi pi-info-circle',
        command: () => {
          this.router.navigate([urls.help])
        }
      },
      {
        icon: 'pi pi-sign-out',
        command: () => {
          this.router.navigate([urls.home]);
          this.auth.logout();
        }
      }
    ];
  }


}
