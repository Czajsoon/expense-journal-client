import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import Method from "../../../models/Method";
import Currency from "../../../models/Currency";
import {PaymentMethodRestService} from "../../../restservices/payment-method-rest.service";
import {ShopMethodRestService} from "../../../restservices/shop-method-rest.service";
import {CurrencyRestService} from "../../../restservices/currency-rest.service";
import {ExpenseRestService} from "../../../restservices/expense-rest.service";
import {MessageToastService} from "../../../shared/message-toast.service";
import {ExpenseValidator} from "../../../shared/expenseValidator";
import ExpenseItem from "../../../models/ExpenseItem";
import {ActivatedRoute} from "@angular/router";
import {ReceiptRestService} from "../../../restservices/receipt-rest.service";
import IExpenseView from "../../../models/ExpenseView";
import {ParseJavaDate} from "../../../shared/ParseJavaDate";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {
  expenseForm: FormGroup;
  expenseItemForm: FormGroup;
  paymentMethods: Method[] = [];
  shopMethods: Method[] = [];
  currencies: Currency[] = [];

  constructor(private paymentMethodsRest: PaymentMethodRestService,
              private shopMethodsRest: ShopMethodRestService,
              private currenciesRest: CurrencyRestService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private expenseRest: ExpenseRestService,
              private messageService: MessageToastService,
              private receiptRest: ReceiptRestService) { }

  ngOnInit(): void {
    this.setPaymentMethods();
    this.setShopMethods();
    this.setCurrencies();
    this.setForm();
    this.setExpenseItemForm();
    this.getReceipt(this.activatedRoute.snapshot.paramMap.get('expenseId'))
  }


  setExpenseItemForm() {
    this.expenseItemForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      currencyCode: ['', [Validators.required]]
    })
  }

  setForm() {
    this.expenseForm = this.fb.group({
      paymentMethodId: ['', [Validators.required]],
      shopMethodId: ['', [Validators.required]],
      dateTime: ['', [Validators.required]],
      note: [''],
      amount: [null],
      currencyCode: [''],
      expenseItems: this.fb.array([])
    }, {
      validator: ExpenseValidator('amount', 'currencyCode', 'expenseItems'),
    })
  }

  get expenseItems() {
    return this.expenseForm.controls['expenseItems'] as FormArray;
  }

  private addExpenseItem(expenseItem: ExpenseItem) {
    const expenseItemForm = this.fb.group({
      name: [expenseItem.name, [Validators.required]],
      amount: [expenseItem.amount, [Validators.required]],
      quantity: [expenseItem.quantity, [Validators.required]],
      currencyCode: [expenseItem.currencyCode, [Validators.required]]
    })
    this.expenseItems.push(expenseItemForm);
  }

  setPaymentMethods() {
    this.paymentMethodsRest.getActivePaymentMethods().subscribe(res => this.paymentMethods = res);
  }

  setShopMethods() {
    this.shopMethodsRest.getActiveShopMethods().subscribe(res => this.shopMethods = res);
  }

  setCurrencies() {
    this.currenciesRest.getCurrencies().subscribe(res => this.currencies = res);
  }

  edit() {
    let previousValue = this.expenseForm.get('dateTime').value;
    this.expenseForm.get('dateTime').setValue(this.expenseForm.get('dateTime').value instanceof Date ? this.getDateString() : this.expenseForm.get('dateTime').value + ":00")
    if (!this.expenseForm.invalid) {
      this.expenseRest.editExpense(this.expenseForm.value, this.activatedRoute.snapshot.paramMap.get('expenseId')).subscribe(() => {
        this.messageService.successToastWithTranslation('EXPENSE.GENERAL.EDIT_SUCCESS')
        this.getReceipt(this.activatedRoute.snapshot.paramMap.get('expenseId'))
        this.expenseItems.clear();
      }, () => {
        this.messageService.errorToastWithTranslation("EXPENSE.GENERAL.EDIT_FAILURE")
      });
    }
    this.expenseForm.get('dateTime').setValue(previousValue)
  }

  deleteProduct(index: number) {
    this.expenseItems.removeAt(index);
  }

  addItem() {
    if (!this.expenseItemForm.invalid) {
      this.addExpenseItem(this.expenseItemForm.value)
      this.expenseItemForm.reset()
    }
  }

  getCurrencyFromForm(currencyCode: string) {
    return this.currencies.find(currency => currency.currencyCode === currencyCode)
  }

  getReceipt(id: string){
    this.receiptRest.getReceipt(id).subscribe((res:IExpenseView) =>{
      this.expenseForm.get('paymentMethodId').setValue(res.paymentMethod.id);
      this.expenseForm.get('shopMethodId').setValue(res.shopMethod.id);
      this.expenseForm.get('dateTime').setValue(
        ParseJavaDate(res.dateTime)
      );
      this.expenseForm.get('note').setValue(res.note);
      this.expenseForm.get('amount').setValue(res.originAmount);
      this.expenseForm.get('currencyCode').setValue(res.originCurrency.currencyCode);
      res.expenseItems.forEach(item =>{
        this.addExpenseItem({name: item.name, amount: item.originAmount, quantity: item.quantity, currencyCode: item.originCurrency.currencyCode})
      })
    })
  }

  private getDateString(): string{
    let date = ""
    let hours = "";
    let minutes = "";
    if(this.expenseForm.get('dateTime').value.getDate() < 10){
      date = "0" + this.expenseForm.get('dateTime').value.toLocaleDateString();
    }
    else{
      date = this.expenseForm.get('dateTime').value.toLocaleDateString();
    }
    if (this.expenseForm.get('dateTime').value.getHours() < 10){
      hours = "0" + this.expenseForm.get('dateTime').value.getHours();
    }
    else {
      hours = this.expenseForm.get('dateTime').value.getHours();
    }
    if (this.expenseForm.get('dateTime').value.getMinutes() < 10){
      minutes = "0" + this.expenseForm.get('dateTime').value.getMinutes();
    }
    else {
      minutes = this.expenseForm.get('dateTime').value.getMinutes();
    }
    return date + ", " + hours + ":" + minutes + ":00"
  }
}
