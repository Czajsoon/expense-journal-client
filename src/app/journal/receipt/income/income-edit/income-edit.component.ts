import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReceiptRestService} from "../../../../restservices/receipt-rest.service";
import IIncomeView from "../../../../models/IncomeView";
import IExpenseView from "../../../../models/ExpenseView";
import {ParseJavaDate} from "../../../../shared/ParseJavaDate";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import IncomeItem from "../../../../models/IncomeItem";
import Product from "../../../../models/Product";
import Price from "../../../../models/Price";
import {AuthService} from "../../../../services/auth.service";
import {ProductRestService} from "../../../../restservices/product-rest.service";
import {IncomeRestService} from "../../../../restservices/income-rest.service";
import {MessageToastService} from "../../../../shared/message-toast.service";

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.scss']
})
export class IncomeEditComponent implements OnInit {

  receipt: IIncomeView = IncomeEditComponent.getEmptyReceipt();
  incomeForm: FormGroup;
  productForm: FormGroup;
  products: Product[] = [];
  prices: Price[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private receiptRest: ReceiptRestService,
              public auth: AuthService,
              private productRest: ProductRestService,
              private incomeRest: IncomeRestService,
              private messageService: MessageToastService,
              private fb: FormBuilder) {
    this.buildForm();
    this.getProducts();
    this.buildProductForm();
  }

  ngOnInit(): void {
    this.getReceipt(this.activatedRoute.snapshot.paramMap.get('incomeId'))
  }

  private buildForm(){
    this.incomeForm = this.fb.group({
      dateTime: [null, Validators.required],
      note: [null],
      items: this.fb.array([])
    })
  }

  getPrices(event) {
    let product = this.products.find(product => product.id.match(event.value));
    this.prices = product.price;
    this.productForm.get('name').setValue(product.name);
  }

  deleteProduct(i: number) {
    this.incomeItems.removeAt(i)
  }

  private getReceipt(incomeId: string) {
    this.receiptRest.getIncome(incomeId).subscribe((res:IIncomeView) =>{
      this.incomeForm.get('dateTime').setValue(
        ParseJavaDate(res.dateTime)
      );
      this.incomeForm.get('note').setValue(res.note);
      res.products.forEach(item => this.addIncomeItem(item))
    })
  }

  get incomeItems() {
    return this.incomeForm.controls['items'] as FormArray;
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

  private addIncomeItem(param: IncomeItem) {
    const incomeItemForm = this.fb.group({
      name: [param.name, [Validators.required]],
      productId: [param.productId, Validators.required],
      price: [param.price, [Validators.required]],
      quantity: [param.quantity, [Validators.required]],
    })
    this.incomeItems.push(incomeItemForm);
  }

  private buildProductForm() {
    this.productForm = this.fb.group({
      productId: [null, [Validators.required]],
      name: [null],
      price: [null, Validators.required],
      quantity: [null, Validators.required]
    })
  }

  addProduct() {
    if(!this.productForm.invalid){
      this.addIncomeItem(this.productForm.value)
      this.productForm.reset();
      this.prices = []
    }
  }

  private getProducts() {
    this.productRest.getActiveProducts(1000, 0,null).subscribe(res => this.products = res.products)
  }

  edit() {
    let previousValue = this.incomeForm.get('dateTime').value;
    this.incomeForm.get('dateTime').setValue(this.incomeForm.get('dateTime').value instanceof Date ? this.getDateString() : this.incomeForm.get('dateTime').value + ":00")
      this.incomeRest.updateIncome(this.activatedRoute.snapshot.paramMap.get('incomeId'), this.incomeForm.value).subscribe(() => {
        this.messageService.successToastWithTranslation('EXPENSE.GENERAL.EDIT_SUCCESS')
        this.getReceipt(this.activatedRoute.snapshot.paramMap.get('expenseId'))
      }, () => {
        this.messageService.errorToastWithTranslation("EXPENSE.GENERAL.EDIT_FAILURE")
      });

    this.incomeForm.get('dateTime').setValue(previousValue)
  }

  private getDateString(): string{
    let date = ""
    let hours = "";
    let minutes = "";
    if(this.incomeForm.get('dateTime').value.getDate() < 10){
      date = "0" + this.incomeForm.get('dateTime').value.toLocaleDateString();
    }
    else{
      date = this.incomeForm.get('dateTime').value.toLocaleDateString();
    }
    if (this.incomeForm.get('dateTime').value.getHours() < 10){
      hours = "0" + this.incomeForm.get('dateTime').value.getHours();
    }
    else {
      hours = this.incomeForm.get('dateTime').value.getHours();
    }
    if (this.incomeForm.get('dateTime').value.getMinutes() < 10){
      minutes = "0" + this.incomeForm.get('dateTime').value.getMinutes();
    }
    else {
      minutes = this.incomeForm.get('dateTime').value.getMinutes();
    }
    return date + ", " + hours + ":" + minutes + ":00"
  }
}
