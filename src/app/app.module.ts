import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from './navigation/navigation.component';
import {RippleModule} from "primeng/ripple";
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {HomeComponent} from './home/home.component';
import {JournalComponent} from './journal/journal/journal.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {CookieModule, CookieService} from 'ngx-cookie';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NetworkInterceptor} from "./services/network.interceptor";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SpeedDialModule} from "primeng/speeddial";
import { SpeedialComponent } from './speedial/speedial.component';
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {AvatarModule} from "primeng/avatar";
import {AccordionModule} from "primeng/accordion";
import { PaymentMethodComponent } from './journal/payment-method/payment-method.component';
import {DividerModule} from "primeng/divider";
import { ShopMethodComponent } from './journal/shop-method/shop-method.component';
import { ReceiptComponent } from './journal/receipt/receipt.component';
import {TabMenuModule} from "primeng/tabmenu";
import {TabViewModule} from "primeng/tabview";
import { ExpenseComponent } from './journal/receipt/expense/expense.component';
import { IncomeComponent } from './journal/receipt/income/income.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import { ExpenseDetailComponent } from './journal/receipt/receipt-detail/expense-detail.component';
import {DialogModule} from "primeng/dialog";
import {SkeletonModule} from "primeng/skeleton";
import { ExpenseEditComponent } from './journal/receipt/expense-edit/expense-edit.component';
import { WarehouseComponent } from './journal/warehouse/warehouse.component';
import { AddProductComponent } from './journal/warehouse/add-product/add-product.component';
import { ProductDetailComponent } from './journal/warehouse/product-detail/product-detail.component';
import { EditProductComponent } from './journal/warehouse/edit-product/edit-product.component';
import {PaginatorModule} from "primeng/paginator";
import { IncomeDetailComponent } from './journal/receipt/income/income-detail/income-detail.component';
import { IncomeEditComponent } from './journal/receipt/income/income-edit/income-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { AvatarDialogComponent } from './settings/avatar-dialog/avatar-dialog.component';
import {FileUploadModule} from "primeng/fileupload";
import { ChangeEmailComponent } from './settings/change-email/change-email.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ReportDialogComponent } from './report/report-dialog/report-dialog.component';
import { ReportComponent } from './report/report/report.component';
import {ChartModule} from "primeng/chart";
import {MatFormFieldModule} from "@angular/material/form-field";
import { UnauthorizedPAgeComponent } from './unauthorized-page/unauthorized-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LanguageSelectorComponent,
    HomeComponent,
    JournalComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    SpeedialComponent,
    PaymentMethodComponent,
    ShopMethodComponent,
    ReceiptComponent,
    ExpenseComponent,
    IncomeComponent,
    ExpenseDetailComponent,
    ExpenseEditComponent,
    WarehouseComponent,
    AddProductComponent,
    ProductDetailComponent,
    EditProductComponent,
    IncomeDetailComponent,
    IncomeEditComponent,
    SettingsComponent,
    AvatarDialogComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ReportDialogComponent,
    ReportComponent,
    UnauthorizedPAgeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    CookieModule.withOptions(),
    MatProgressSpinnerModule,
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    ConfirmDialogModule,
    SpeedDialModule,
    CardModule,
    CalendarModule,
    InputNumberModule,
    AvatarModule,
    AccordionModule,
    DividerModule,
    TabMenuModule,
    TabViewModule,
    MatGridListModule,
    TableModule,
    TagModule,
    DialogModule,
    SkeletonModule,
    PaginatorModule,
    FileUploadModule,
    ChartModule,
    MatFormFieldModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService, CookieService, ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
