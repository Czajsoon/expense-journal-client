import { Component, OnInit } from '@angular/core';
import Product from "../../../models/Product";
import {ProductRestService} from "../../../restservices/product-rest.service";
import Price from "../../../models/Price";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import IncomeItem from "../../../models/IncomeItem";
import {AuthService} from "../../../services/auth.service";
import {IncomeRestService} from "../../../restservices/income-rest.service";
import {MessageToastService} from "../../../shared/message-toast.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  products: Product[] = [];
  prices: Price[] = [];
  productForm: FormGroup;
  incomeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productRest: ProductRestService,
    public auth: AuthService,
    private incomeRest: IncomeRestService,
    private messageService: MessageToastService) {
    this.getProducts();
    this.buildProductForm();
    this.buildIncomeForm();
  }

  ngOnInit(): void {
  }

  buildIncomeForm(){
    this.incomeForm = this.fb.group({
      dateTime: [null, Validators.required],
      note: [null],
      items:  this.fb.array([])
    })
  }

  addItem(prod: IncomeItem){
    const product = this.fb.group({
      productId: [prod.productId, [Validators.required]],
      priceId: [prod.priceId, Validators.required],
      name: this.products.find(p => p.id.match(prod.productId)).name,
      price: this.prices.find(p => p.id === prod.priceId).price,
      quantity: [prod.quantity, Validators.required]
    });
    this.items.push(product);
    this.productForm.reset();
    this.prices = [];
  }

  get items() {
    return this.incomeForm.controls['items'] as FormArray;
  }

  buildProductForm(){
    this.productForm = this.fb.group({
      productId: [null, [Validators.required]],
      priceId: [null, Validators.required],
      quantity: [null, Validators.required]
    })
  }

  getProducts(){
    this.productRest.getActiveProducts(1000, 0,null).subscribe(res => this.products = res.products)
  }

  addProduct() {
    if(!this.productForm.invalid){
      this.addItem(this.productForm.value)
    }
  }

  getPrices(event) {
    this.prices = this.products.find(product => product.id.match(event.value)).price
  }

  deleteProduct(i: number) {
    this.items.removeAt(i)
  }

  addIncome() {
    if(!this.incomeForm.invalid || this.items.length !== 0){
      this.incomeRest.addIncome(this.incomeForm.value).subscribe(() =>{
        this.messageService.successToastWithTranslation('INCOME.ADD_INCOME_SUCCESS')
        this.incomeForm.reset();
        this.items.clear();
      },error =>{
        this.messageService.errorToast(error.error);
      })
    }
  }
}
