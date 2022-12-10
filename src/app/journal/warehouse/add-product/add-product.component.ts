import { Component, OnInit } from '@angular/core';
import PeriodType from "../../../models/PeriodType";
import {PeriodTypeRestService} from "../../../restservices/period-type-rest.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Currency from "../../../models/Currency";
import {CurrencyType} from "../../../models/CurrencyType";
import {CurrencyRestService} from "../../../restservices/currency-rest.service";
import {AuthService} from "../../../services/auth.service";
import {ProductRestService} from "../../../restservices/product-rest.service";
import {MessageToastService} from "../../../shared/message-toast.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  price: number = null;
  productForm: FormGroup;
  type: PeriodType[] = [];
  constructor(private periodRest: PeriodTypeRestService,
              private fb: FormBuilder,
              public auth: AuthService,
              private productRest: ProductRestService,
              private message: MessageToastService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.getPeriods();
    this.setUpForm();
  }

  setUpForm(){
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      period: [null, [Validators.required]],
      prices: this.fb.array([])
    })
  }

  get prices() {
    return this.productForm.controls['prices'] as FormArray;
  }

  addPrice(price: number){
    if (price !== null && price !== 0){
      this.price = null;
      this.prices.push(new FormControl(price));
    }
  }

  getPeriods(){
    this.periodRest.getPeriods().subscribe(res => this.type = res)
  }

  add() {
    if(!this.productForm.invalid && this.prices.length !== 0){
     this.productRest.addProduct(this.productForm.value).subscribe(() =>{
       this.message.successToastWithTranslation(this.translate.instant('ADD_PRODUCT.ADD_PRODUCT_SUCCESS'))
       this.prices.clear();
       this.productForm.reset();
     }, error => {
       this.message.errorToast(error.error)
     });
    }
  }

  deletePrice(i: number) {
    this.prices.removeAt(i);
  }
}
