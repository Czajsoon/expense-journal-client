import {Component, OnInit, ViewChild} from '@angular/core';
import ExpenseFilter from "../../models/ExpenseFilter";
import {TranslateService} from "@ngx-translate/core";
import {PaymentMethodRestService} from "../../restservices/payment-method-rest.service";
import Method from "../../models/Method";
import {ShopMethodRestService} from "../../restservices/shop-method-rest.service";
import {AuthService} from "../../services/auth.service";
import {CurrencyRestService} from "../../restservices/currency-rest.service";
import Currency from "../../models/Currency";
import {CurrencyType} from "../../models/CurrencyType";
import {ReceiptRestService} from "../../restservices/receipt-rest.service";
import ReceiptResponse from "../../models/ReceiptResponse";
import {ParseJavaDate} from "../../shared/ParseJavaDate";
import {ConfirmationService} from "primeng/api";
import {MessageToastService} from "../../shared/message-toast.service";
import {Subject} from "rxjs";
import SearchReceiptQuery from "../../models/SearchReceiptQuery";
import {Router} from "@angular/router";
import urls from "../../../environments/urls";
import {IncomeDetailComponent} from "../receipt/income/income-detail/income-detail.component";
import {Balance} from "../../models/Balance";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  date: Date = new Date();
  balance: Balance = {incomes: 0, expenses: 0, balance: 0} as Balance;
  expenseFilter: ExpenseFilter[] = [];
  expenseModel: ExpenseFilter = {name: null, value: null};
  paymentMethods: Method[] = [];
  selectedPaymentMethod: Method = null;
  shopMethods: Method[] = [];
  selectedShopMethod: Method = null;
  expenseName: string = "";
  incomeName: string = "";
  rangeDates: Date[] = null;
  amountFrom: number = null;
  amountTo: number = null;
  receipts: ReceiptResponse = JournalComponent.getEmptyReceipts();
  receiptsLoading: boolean = true;
  currency: Currency = {currency: CurrencyType.PLN, currencyCode: "PLN", currencyLocale: "pl-PL", currencyName: ""};
  displayDetail: boolean = false;
  displayIncomeDetail: boolean = false;
  receiptEvent: Subject<string> = new Subject<string>();
  receiptIncomeEvent: Subject<string> = new Subject<string>();
  @ViewChild(IncomeDetailComponent,{static: true}) incomeDetail: IncomeDetailComponent;
  first: number = 0;
  private page: number = 0;

  constructor(private translate: TranslateService,
              private paymentMethodRest: PaymentMethodRestService,
              private shopMethodRest: ShopMethodRestService,
              public auth: AuthService,
              private routing: Router,
              private currencyRest: CurrencyRestService,
              private receiptRest: ReceiptRestService,
              private confirmationService: ConfirmationService,
              private messageService: MessageToastService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setUpExpenseFilter();
      this.currencyRest.getCurrency(this.auth.defaultCurrency)
        .subscribe((res) => this.currency = res);
    }, 200);
    this.setUpPaymentMethods();
    this.setUpShopMethods();
    this.setUpReceipts(null,0);

  }

  getBalance(){
    this.receiptRest.getBalance().subscribe(res => this.balance = res);
  }

  setUpReceipts(body: SearchReceiptQuery, page: number) {
    this.getBalance();
    this.receiptsLoading = true
    this.receiptRest.getReceipts(5, page, body).subscribe((res: ReceiptResponse) => {
      this.receipts = res;
      this.receiptsLoading = false;
    }, () => {
      this.receiptsLoading = false;
    });
  }

  setUpPaymentMethods() {
    this.paymentMethodRest.getPaymentMethods().subscribe(res => this.paymentMethods = res);
  }

  setUpShopMethods() {
    this.shopMethodRest.getShopMethods().subscribe(res => this.shopMethods = res);
  }

  setUpExpenseFilter() {
    this.translate.get('JOURNAL.FILTER.EXPENSE').subscribe((translate) => this.expenseName = translate);
    this.translate.get('JOURNAL.FILTER.INCOME').subscribe((translate) => this.incomeName = translate);
    this.expenseFilter = [
      {value: true, name: this.expenseName},
      {value: false, name: this.incomeName}
    ]
  }

  parseDate(date: number[]) {
    return ParseJavaDate(date);
  }

  confirmDelete(id: string) {
    this.confirmationService.confirm({
      header: this.translate.instant('CONFIRMATION'),
      message: this.translate.instant('JOURNAL.DELETE_TITLE'),
      accept: () => {
        this.receiptRest.deleteReceipt(id).subscribe(() => {
          this.setUpReceipts(this.buildSearchQuery(), 0);
          this.messageService.successToastWithTranslation('JOURNAL.DELETE_SUCCESS')
        }, () => {
          this.messageService.errorToastWithTranslation('JOURNAL.DELETE_FAIL')
        })
      },
      acceptLabel: this.translate.instant("YES"),
      rejectLabel: this.translate.instant("NO")
    })
  }

  showDetail(id: string) {
    this.receiptEvent.next(id);
    this.displayDetail = true;
  }

  showIncomeDetail(id: string) {
    this.incomeDetail.receiptId = id;
    this.incomeDetail.show();
  }

  editIncome(id: string){
    this.routing.navigate([urls.incomeEdit,id])
  }

  closeDetail(e: boolean) {
    this.displayDetail = e;
  }

  closeIncomeDetail(e: boolean) {
    this.displayIncomeDetail = e;
  }

  searchReceipts() {
    this.setUpReceipts(this.buildSearchQuery(), 0);
  }

  private buildSearchQuery(): SearchReceiptQuery {
    return {
      paymentMethodId: this.selectedPaymentMethod !== null ? this.selectedPaymentMethod.id : null,
      shopMethodId: this.selectedShopMethod !== null ? this.selectedShopMethod.id : null,
      dateFrom: this.rangeDates !== null ? this.rangeDates[0].getDate() < 10 ? "0" + this.rangeDates[0].toLocaleDateString() + ", 00:00:00" : this.rangeDates[0].toLocaleDateString() + ", 00:00:00" : null,
      dateTo: this.rangeDates !== null ? this.rangeDates[1].getDate() < 10 ? "0" + this.rangeDates[1].toLocaleDateString() + ", 23:59:59" : this.rangeDates[1].toLocaleDateString() + ", 23:59:59" : null,
      amountFrom: this.amountFrom,
      amountTo: this.amountTo,
      note: null,
      expense: this.expenseModel !== null ? this.expenseModel.value : null
    }
  }

  private static getEmptyReceipts(): ReceiptResponse {
    return {
      totalPages: 0,
      receipts: [
        {isExpense: null, receipt: null},
        {isExpense: null, receipt: null},
        {isExpense: null, receipt: null},
        {isExpense: null, receipt: null},
        {isExpense: null, receipt: null},
      ]
    }
  }

  changeExpenseFilter() {
    if (this.expenseModel === null) {
      this.selectedPaymentMethod = null;
      this.selectedShopMethod = null;
    }
  }

  goToEditExpense(id: string) {
    this.routing.navigate([urls.expenseEdit,id])
  }

  paginate(event: any) {
    this.receiptsLoading = true;
    this.first = event.first;
    this.page = event.page;
    this.setUpReceipts(this.buildSearchQuery(), event.page);
  }
}
