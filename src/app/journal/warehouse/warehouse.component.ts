import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import urls from "../../../environments/urls";
import {ProductRestService} from "../../restservices/product-rest.service";
import ProductsTable from "../../models/ProductsTable";
import PeriodType from "../../models/PeriodType";
import {PeriodTypeRestService} from "../../restservices/period-type-rest.service";
import ProductType from "../../models/ProductType";
import ProductActive from "../../models/ProductActive";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import Product from "../../models/Product";
import {Subject} from "rxjs";
import {ConfirmationService} from "primeng/api";
import {MessageToastService} from "../../shared/message-toast.service";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  productsTable: ProductsTable = WarehouseComponent.emptyProductsTable();
  loadingTable: boolean = true;
  type: PeriodType[] = [];
  productTypes: ProductType[] = [];
  activeProducts: ProductActive[] = [];
  filterForm: FormGroup;
  displayDetailModal: boolean = false;
  detailProduct: Product = null;
  productEvent: Subject<Product> = new Subject<Product>();
  first: number = 0;


  constructor(private router: Router,
              private fb: FormBuilder,
              private productRest: ProductRestService,
              private translate: TranslateService,
              private periodRest: PeriodTypeRestService,
              private confirmationService: ConfirmationService,
              private messageService: MessageToastService,
              private routing: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getTable({active: true});
    this.getPeriods();
    this.getProductTypes();
    this.getActiveProducts();
  }

  buildForm(){
    this.filterForm = this.fb.group({
      active: null,
      name: null,
      period: null,
      type: null,
    });
  }

  getTable(body: any) {
    this.loadingTable = true
    this.productRest.getActiveProducts(5, 0, body).subscribe((res) => {
      this.productsTable = res;
      this.loadingTable = false;
    })
  }

  getActiveProducts(){
    setTimeout(() =>this.activeProducts = [
      {value: false, name: this.translate.instant("YES")},
      {value: true, name: this.translate.instant("NO")},
    ], 200)
  }

  getPeriods(){
    this.periodRest.getPeriods().subscribe(res => this.type = res);
  }

  getProductTypes(){
    this.periodRest.getProductType().subscribe(res => this.productTypes = res);
  }

  goToAddProduct() {
    this.router.navigate([urls.addProduct])
  }

  private static emptyProductsTable(): ProductsTable {
    return {
      totalPages: 0,
      products: [
        {
          id: null,
          period: {
            name: null,
            period: null,
            translation: null
          },
          type: {
            name: null,
            type: null,
            translation: null
          }, currency: {
            currency: null,
            currencyCode: null,
            currencyName: null,
            currencyLocale: null
          },
          price: [],
          name: null,
          active: null
        },
        {
          id: null,
          period: {
            name: null,
            period: null,
            translation: null
          },
          type: {
            name: null,
            type: null,
            translation: null
          }, currency: {
            currency: null,
            currencyCode: null,
            currencyName: null,
            currencyLocale: null
          },
          price: [],
          name: null,
          active: null
        },
        {
          id: null,
          period: {
            name: null,
            period: null,
            translation: null
          },
          type: {
            name: null,
            type: null,
            translation: null
          }, currency: {
            currency: null,
            currencyCode: null,
            currencyName: null,
            currencyLocale: null
          },
          price: [],
          name: null,
          active: null
        },
        {
          id: null,
          period: {
            name: null,
            period: null,
            translation: null
          },
          type: {
            name: null,
            type: null,
            translation: null
          }, currency: {
            currency: null,
            currencyCode: null,
            currencyName: null,
            currencyLocale: null
          },
          price: [],
          name: null,
          active: null
        },
        {
          id: null,
          period: {
            name: null,
            period: null,
            translation: null
          },
          type: {
            name: null,
            type: null,
            translation: null
          }, currency: {
            currency: null,
            currencyCode: null,
            currencyName: null,
            currencyLocale: null
          },
          price: [],
          name: null,
          active: null
        }
      ]
    }
  }

  search() {
    this.loadingTable = true;
    this.productRest.getActiveProducts(5, 0, this.filterForm.value).subscribe((res) => {
      this.productsTable = res;
      this.loadingTable = false;
    })
  }

  closeDetail(e: boolean) {
    this.displayDetailModal = e;
  }

  clearFilterForm(){
    this.filterForm.reset();
  }

  showDetail(product: Product) {
    this.productEvent.next(product);
    this.displayDetailModal = true;
  }

  deleteProduct(id:string){
    this.confirmationService.confirm({
      message: this.translate.instant('WAREHOUSE.DELETE_TITLE'),
      accept: () => {
        console.log(id);
        this.productRest.deleteProduct(id).subscribe(() => {
          this.getTable({active: true});
          this.messageService.successToastWithTranslation('WAREHOUSE.DELETE_SUCCESS')
        }, () => {
          this.messageService.errorToastWithTranslation('WAREHOUSE.DELETE_FAIL')
        })
      },
      acceptLabel: this.translate.instant("YES"),
      rejectLabel: this.translate.instant("NO")
    })
  }

  paginate(event) {
    this.loadingTable = true;
    this.productRest.getActiveProducts(event.rows, event.page, this.filterForm.value).subscribe((res) => {
      this.productsTable = res;
      this.loadingTable = false;
      this.first = event.first;
    })
  }

  goToEditProduct(id: string) {
    this.routing.navigate([urls.editProduct,id])
  }

}
