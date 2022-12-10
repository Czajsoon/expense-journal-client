import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ReceiptRestService} from "../../../../restservices/receipt-rest.service";
import IIncomeView from "../../../../models/IncomeView";
import {ParseJavaDate} from "../../../../shared/ParseJavaDate";
import IncomeItem from "../../../../models/IncomeItem";
import Income from "../../../../models/Income";

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss']
})
export class IncomeDetailComponent implements OnInit {

  @Input() display: boolean;
  @Input() receiptEvent: Observable<string>;
  @Input() receiptId: string;
  @Output() closeEvent = new EventEmitter<boolean>();
  receipt: IIncomeView = IncomeDetailComponent.getEmptyReceipt();
  receiptLoading: boolean = true;

  constructor(private receiptRest: ReceiptRestService) {
  }

  ngOnInit(): void {

  }

  private getReceiptDetail(): void {
    this.receiptRest.getIncome(this.receiptId).subscribe((receipt: IIncomeView) => {
      this.receipt = receipt;
      this.receiptLoading = false;
    })
  }

  show() {
    this.getReceiptDetail();
    this.display = true;
  }

  hide() {
    this.display = false;
  }

  private static getEmptyReceipt(): IIncomeView {
    return {
      expense: false,
      id: "",
      dateTime: [],
      products: [],
      note: "",
      originCurrency: null,
      originAmount: 0,
      currency: null,
      amount: 0
    }
  }

  parseJavaDate(date: number[]): Date {
    if (date.length === 0) {
      return new Date();
    }
    return ParseJavaDate(date)
  }

}
