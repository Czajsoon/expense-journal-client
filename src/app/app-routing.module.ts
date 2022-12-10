import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routing} from "../environments/routing";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import urls from "../environments/urls";
import {HomeComponent} from "./home/home.component";
import {JournalComponent} from "./journal/journal/journal.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {PaymentMethodComponent} from "./journal/payment-method/payment-method.component";
import {ShopMethodComponent} from "./journal/shop-method/shop-method.component";
import {ReceiptComponent} from "./journal/receipt/receipt.component";
import {ExpenseEditComponent} from "./journal/receipt/expense-edit/expense-edit.component";
import {WarehouseComponent} from "./journal/warehouse/warehouse.component";
import {AddProductComponent} from "./journal/warehouse/add-product/add-product.component";
import {EditProductComponent} from "./journal/warehouse/edit-product/edit-product.component";
import {IncomeEditComponent} from "./journal/receipt/income/income-edit/income-edit.component";
import {SettingsComponent} from "./settings/settings.component";
import {ReportComponent} from "./report/report/report.component";
import {UnauthorizedPAgeComponent} from "./unauthorized-page/unauthorized-page.component";
import {LoginGuardGuard} from "./services/login-guard.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: urls.home},
  {path: routing.home, component: HomeComponent},
  {path: routing.home + "/:message", component: HomeComponent},
  {path: routing.language, component: LanguageSelectorComponent},
  {path: routing.journal, component: JournalComponent, canActivate: [LoginGuardGuard]},
  {path: routing.paymentMethods, component: PaymentMethodComponent, canActivate: [LoginGuardGuard]},
  {path: routing.shopMethods, component: ShopMethodComponent, canActivate: [LoginGuardGuard]},
  {path: routing.receipt, component: ReceiptComponent, canActivate: [LoginGuardGuard]},
  {path: routing.expenseEdit + "/:expenseId", component: ExpenseEditComponent, canActivate: [LoginGuardGuard]},
  {path: routing.incomeEdit + "/:incomeId", component: IncomeEditComponent, canActivate: [LoginGuardGuard]},
  {path: routing.warehouse, component: WarehouseComponent, canActivate: [LoginGuardGuard]},
  {path: routing.addProduct, component: AddProductComponent, canActivate: [LoginGuardGuard]},
  {path: routing.editProduct + "/:productId", component: EditProductComponent, canActivate: [LoginGuardGuard]},
  {path: routing.help, component: AboutComponent},
  {path: routing.settings, component: SettingsComponent, canActivate: [LoginGuardGuard]},
  {path: routing.login + "/:confirmationSuccess", component: LoginComponent},
  {path: routing.login, component: LoginComponent},
  {path: routing.register, component: RegisterComponent},
  {path: routing.report + "/:month/:year", component: ReportComponent, canActivate: [LoginGuardGuard]},
  {path: routing.unauthorized, component: UnauthorizedPAgeComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
