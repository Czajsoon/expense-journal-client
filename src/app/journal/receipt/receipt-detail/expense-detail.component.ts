import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Receipt from "../../../models/Receipt";
import IExpenseView from "../../../models/ExpenseView";
import {Observable} from "rxjs";
import {ReceiptRestService} from "../../../restservices/receipt-rest.service";
import {ParseJavaDate} from "../../../shared/ParseJavaDate";

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {

  @Input() display: boolean;
  @Input() receiptEvent: Observable<string>;
  @Output() closeEvent = new EventEmitter<boolean>();
  receipt: IExpenseView = ExpenseDetailComponent.getEmptyReceipt();
  receiptLoading: boolean = true;

  constructor(private receiptRest: ReceiptRestService) { }

  ngOnInit(): void {
    this.receiptEvent.subscribe(receiptId => {
      this.receiptRest.getReceipt(receiptId).subscribe((receipt:IExpenseView) => {
        this.receipt = receipt;
        this.receiptLoading = false;
      })
    })
  }

  close(): void{
    this.closeEvent.emit(false);
    this.receipt = ExpenseDetailComponent.getEmptyReceipt();
    setTimeout(() => this.receiptLoading = true, 100);
  }

  private static getEmptyReceipt(): IExpenseView{
    return {
      id: null,
      paymentMethod: {
        id: null,
        name: null,
        fromSystem: null,
        active: null
      },
      shopMethod: {
        id: null,
        name: null,
        fromSystem: null,
        active: null
      },
      dateTime: [],
      note: null,
      amount: null,
      originAmount: null,
      expense: null,
      currency: null,
      originCurrency: null,
      expenseItems: null
    }
  }

  parseJavaDate(date: number[]): Date {
    if (date.length === 0){
      return new Date();
    }
    return ParseJavaDate(date)
  }
}
