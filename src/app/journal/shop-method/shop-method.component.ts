import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import Method from "../../models/Method";
import {ShopMethodRestService} from "../../restservices/shop-method-rest.service";
import {TranslateService} from "@ngx-translate/core";
import {MessageToastService} from "../../shared/message-toast.service";

@Component({
  selector: 'app-shop-method',
  templateUrl: './shop-method.component.html',
  styleUrls: ['./shop-method.component.scss']
})
export class ShopMethodComponent implements OnInit {

  shopMethod: FormGroup;
  shopMethodsForm: FormGroup;

  constructor(private fb: FormBuilder,
              private shopMethodRest: ShopMethodRestService,
              private translate: TranslateService,
              private messageToastService: MessageToastService,) { }

  ngOnInit(): void {
    this.buildShopForm();
    this.setShopMethods();
    this.buildForm();
  }

  private buildShopForm(){
    this.shopMethodsForm = this.fb.group({
      methods: this.fb.array([])
    })
  }

  private buildForm() {
    return this.shopMethod = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  get methods() {
    return this.shopMethodsForm.controls['methods'] as FormArray;
  }

  private addMethod(method: Method) {
    const methodForm = this.fb.group({
      id: [method.id],
      name: [method.name, [Validators.required]],
      fromSystem: [method.fromSystem],
      active: [method.active]
    })
    this.methods.push(methodForm);
  }

  setShopMethods() {
    this.methods.clear();
    this.shopMethodRest.getShopMethods().subscribe((res: Method[]) => {
      res.forEach(method => this.addMethod(method))
    })
  }

  add() {
    this.shopMethodRest.add(this.shopMethod.value).subscribe(() => {
      this.messageToastService.successToastWithTranslation('SHOP_METHOD.ADDED')
      this.setShopMethods();
      this.shopMethod.reset();
    }, error => {
      this.messageToastService.errorToast(error.error);
    })
  }

  changeShopMethodNameEvent(e: any, index: number) {
    this.methods.at(index).get('name').setValue(e.target.value);
  }

  edit(id: string, index: number) {
    this.shopMethodRest.edit(id, this.methods.at(index).get('name').value).subscribe(() => {
      this.messageToastService.successToastWithTranslation('SHOP_METHOD.CHANGED');
      this.setShopMethods();
    }, error => {
      this.messageToastService.errorToast(error.error);
    })
  }

  deletePaymentMethod(id: string) {
    this.shopMethodRest.delete(id).subscribe(() => {
      this.setShopMethods();
      this.messageToastService.successToastWithTranslation('SHOP_METHOD.DELETED');
    }, error => {
      this.messageToastService.errorToast(error.error);
    })
  }
}
