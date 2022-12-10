import {Component, OnInit} from '@angular/core';
import Method from "../../../models/Method";
import {PaymentMethodRestService} from "../../../restservices/payment-method-rest.service";
import {ShopMethodRestService} from "../../../restservices/shop-method-rest.service";
import Currency from "../../../models/Currency";
import {CurrencyRestService} from "../../../restservices/currency-rest.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import ExpenseItem from "../../../models/ExpenseItem";
import {ExpenseRestService} from "../../../restservices/expense-rest.service";
import {ExpenseValidator} from "../../../shared/expenseValidator";
import {MessageToastService} from "../../../shared/message-toast.service";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  expenseItemForm: FormGroup;
  paymentMethods: Method[] = [];
  shopMethods: Method[] = [];
  currencies: Currency[] = [];

  constructor(private paymentMethodsRest: PaymentMethodRestService,
              private shopMethodsRest: ShopMethodRestService,
              private currenciesRest: CurrencyRestService,
              private fb: FormBuilder,
              private expenseRest: ExpenseRestService,
              private messageService: MessageToastService) {
  }

  ngOnInit(): void {
    this.setPaymentMethods();
    this.setShopMethods();
    this.setCurrencies();
    this.setForm();
    this.setExpenseItemForm();
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

  add() {
    if (!this.expenseForm.invalid) {
      this.expenseRest.addExpense(this.expenseForm.value).subscribe(() => {
        this.messageService.successToastWithTranslation('EXPENSE.ADDED')
        this.expenseForm.reset()
        this.expenseItems.clear();
      }, () => {
        this.messageService.errorToastWithTranslation("EXPENSE.ERROR")
      });
    }
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
}
