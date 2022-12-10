import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Product from "../../../models/Product";
import {Observable} from "rxjs";
import {Period} from "../../../models/Period";
import {CurrencyType} from "../../../models/CurrencyType";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<boolean>();
  @Input() display: boolean;
  @Input() productEvent: Observable<Product>;
  product: Product = ProductDetailComponent.emptyProduct();

  constructor() {
  }

  ngOnInit(): void {
    this.productEvent.subscribe(product => this.product = product)
  }

  close(): void{
    this.closeEvent.emit(false);
  }

  private static emptyProduct(): Product{
    return {
      id: "id",
      active: false,
      currency: {
        currency: CurrencyType.PLN,
        currencyCode: "PLN",
        currencyName: "PLN",
        currencyLocale: "PL-pl"
      },
      name: "",
      period: {
        name: "",
        period: Period.INDIVIDUAL,
        translation: ""
      },
      price: [],
      type: {
        name: "",
        type: "",
        translation: ""
      }
    }
  }
}
