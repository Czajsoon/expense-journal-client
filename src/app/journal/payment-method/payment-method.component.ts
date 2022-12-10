import {Component, OnInit} from '@angular/core';
import {PaymentMethodRestService} from "../../restservices/payment-method-rest.service";
import Method from "../../models/Method";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageToastService} from "../../shared/message-toast.service";

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  paymentMethod: FormGroup;
  paymentMethodsForm: FormGroup;

  constructor(private paymentMethodRest: PaymentMethodRestService,
              private translate: TranslateService,
              private messageToastService: MessageToastService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildPaymentForm();
    this.setPaymentMethods();
    this.buildForm();
  }

  private buildPaymentForm(){
    this.paymentMethodsForm = this.fb.group({
      methods: this.fb.array([])
    })
  }

  private buildForm() {
    return this.paymentMethod = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  get methods() {
    return this.paymentMethodsForm.controls['methods'] as FormArray;
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

  setPaymentMethods() {
    this.methods.clear();
    this.paymentMethodRest.getActivePaymentMethods().subscribe((res: Method[]) => {
      res.forEach(method => this.addMethod(method))
    })
  }

  edit(id: string, index: number) {
    this.paymentMethodRest.edit(id, this.methods.at(index).get('name').value).subscribe(() => {
      this.messageToastService.successToastWithTranslation('PAYMENT_METHOD.CHANGED');
      this.setPaymentMethods();
    }, error => {
      this.messageToastService.errorToast(error.error);
    })
  }

  deletePaymentMethod(id: string) {
    this.paymentMethodRest.delete(id).subscribe(() => {
      this.setPaymentMethods();
      this.messageToastService.successToastWithTranslation('PAYMENT_METHOD.DELETED');
    }, error => {
      this.messageToastService.errorToast(error.error);
    })
  }

  add() {
    this.paymentMethodRest.add(this.paymentMethod.value).subscribe(() => {
      this.messageToastService.successToastWithTranslation('PAYMENT_METHOD.ADDED')
      this.setPaymentMethods();
      this.paymentMethod.reset();
    }, error => {
      this.messageToastService.errorToast(error.error);
    })
  }

  changePaymentMethodNameEvent(e: any, index: number) {
    this.methods.at(index).get('name').setValue(e.target.value);
  }
}
