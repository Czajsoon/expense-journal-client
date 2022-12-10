import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReportRestService} from "../../restservices/report-rest.service";
import {Report} from "../../models/Report";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  letters = '0123456789ABCDEF';
  chartIncomeByProductType: any;
  chartIncomeByPeriodType: any;
  chartIncomeByProducts: any;
  chartExpenseByPaymentMethod: any;
  month: string;
  year: string;
  report: Report = ReportComponent.emptyReport();
  chartExpenseByShopMethod: any;

  constructor(private route: ActivatedRoute,
              public auth: AuthService,
              private reportRest: ReportRestService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.month = param.get('month');
      this.year = param.get('year')
      this.getReport();
    })
  }



  getReport() {
    this.reportRest.getReport(this.month, this.year).subscribe(res => {
      this.report = res;
      this.setUpCharts();
    })
  }

  setUpCharts(){
    this.setChartByPeriodType();
    this.setChartByProductType();
    this.setChartByProduct();
    this.setChartExpenseByPaymentMethod();
    this.setChartExpenseByShopMethod();
  }

  setChartByProductType(){
    this.chartIncomeByProductType = {
      labels: [...this.report.incomes.incomeReportElementsByProductTypes.map(value => value.name)],
      datasets: [
        {
          data: [...this.report.incomes.incomeReportElementsByProductTypes.map(value => value.totalPrice)],
          backgroundColor: [...this.getArrayOfRandomColors(this.report.incomes.incomeReportElementsByProductTypes.length)]
        }
      ]
    };
  }

  setChartByPeriodType(){
    this.chartIncomeByPeriodType = {
      labels: [...this.report.incomes.incomeReportElementsByPeriodType.map(value => value.name)],
      datasets: [
        {
          data: [...this.report.incomes.incomeReportElementsByPeriodType.map(value => value.totalPrice)],
          backgroundColor: [...this.getArrayOfRandomColors(this.report.incomes.incomeReportElementsByPeriodType.length)]
        }
      ]
    };
  }

  setChartByProduct(){
    this.chartIncomeByProducts = {
      labels: [...this.report.incomes.incomeReportElementsByProducts.map(value => value.name)],
      datasets: [
        {
          data: [...this.report.incomes.incomeReportElementsByProducts.map(value => value.totalPrice)],
          backgroundColor: [...this.getArrayOfRandomColors(this.report.incomes.incomeReportElementsByProducts.length)]
        }
      ]
    };
  }

  setChartExpenseByPaymentMethod(){
    this.chartExpenseByPaymentMethod = {
      labels: [...this.report.expenses.paymentMethods.map(value => value.name)],
      datasets: [
        {
          data: [...this.report.expenses.paymentMethods.map(value => value.totalPrice)],
          backgroundColor: [...this.getArrayOfRandomColors(this.report.expenses.paymentMethods.length)]
        }
      ]
    };
  }

  setChartExpenseByShopMethod(){
    this.chartExpenseByShopMethod = {
      labels: [...this.report.expenses.shopMethods.map(value => value.name)],
      datasets: [
        {
          data: [...this.report.expenses.shopMethods.map(value => value.totalPrice)],
          backgroundColor: [...this.getArrayOfRandomColors(this.report.expenses.shopMethods.length)]
        }
      ]
    };
  }

  getArrayOfRandomColors(size: number){
    let colors = [];
    for(let i = 0; i< size; i++){
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  getRandomColor() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += this.letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private static emptyReport(): Report {
    return {
      balance: 0,
      expenses: {
        paymentMethods: [],
        shopMethods: [],
        total: 0
      },
      incomes: {
        incomeReportElementsByPeriodType: [],
        incomeReportElementsByProductTypes: [],
        incomeReportElementsByProducts: [],
        total: 0
      },
      month: "",
      year: 0
    }
  }
}
