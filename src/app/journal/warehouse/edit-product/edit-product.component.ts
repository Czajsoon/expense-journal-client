import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import PeriodType from "../../../models/PeriodType";
import {AuthService} from "../../../services/auth.service";
import Product from "../../../models/Product";
import {ActivatedRoute} from "@angular/router";
import {ProductRestService} from "../../../restservices/product-rest.service";
import {PeriodTypeRestService} from "../../../restservices/period-type-rest.service";
import {MessageToastService} from "../../../shared/message-toast.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  price: number = null;
  productForm: FormGroup;
  type: PeriodType[] = [];
  @Input() product: Product;

  constructor(private fb: FormBuilder,
              public auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private productRest: ProductRestService,
              private periodRest: PeriodTypeRestService,
              private messageService: MessageToastService) {
    this.getPeriods();
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('productId'))
  }

  ngOnInit(): void {
    this.setUpForm();
  }

  edit() {
    if(!this.productForm.invalid && this.prices.length !== 0){
      this.productRest.updateProduct(this.productForm.value, this.activatedRoute.snapshot.paramMap.get('productId'))
        .subscribe(() =>{
          this.messageService.successToastWithTranslation('WAREHOUSE.EDIT_SUCCESS')
        }, error => {
          this.messageService.errorToast(error.error)
          this.getProduct(this.activatedRoute.snapshot.paramMap.get('productId'))
        })
    }
  }

  setUpForm(){
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      period: [null, [Validators.required]],
      prices: this.fb.array([])
    })
  }

  setUpFormWithProduct(product: Product){
    this.productForm = this.fb.group({
      name: [product.name, [Validators.required]],
      period: [product.period.name, [Validators.required]],
      prices: this.fb.array([])
    })
    product.price.forEach(price => this.addPrice(price.price))
  }

  get prices() {
    return this.productForm.controls['prices'] as FormArray;
  }

  getPeriods(){
    this.periodRest.getPeriods().subscribe(res => this.type = res)
  }

  addPrice(price: number){
    if (price !== null && price !== 0){
      this.price = null;
      this.prices.push(new FormControl(price));
    }
  }

  deletePrice(i: number) {
    this.prices.removeAt(i);
  }

  private getProduct(productId: string) {
    this.productRest.getProduct(productId).subscribe(res => this.setUpFormWithProduct(res));
  }
}
