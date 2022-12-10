export interface Report {
	balance: number;
	incomes: Incomes;
	expenses: Expenses;
	month: string;
	year: number;
}
export interface IncomeReportElementsByPeriodType {
	name: string;
	totalPrice: number;
}
export interface IncomeReportElementsByProductTypes {
	name: string;
	totalPrice: number;
}
export interface IncomeReportElementsByProducts {
	name: string;
	totalPrice: number;
}
export interface Incomes {
	incomeReportElementsByPeriodType: IncomeReportElementsByPeriodType[];
	incomeReportElementsByProductTypes: IncomeReportElementsByProductTypes[];
	incomeReportElementsByProducts: IncomeReportElementsByProducts[];
	total: number;
}
export interface ExpensesPaymentMethods {
	name: string;
	totalPrice: number;
}
export interface ExpensesShopMethods {
	name: string;
	totalPrice: number;
}
export interface Expenses {
	paymentMethods: ExpensesPaymentMethods[];
	shopMethods: ExpensesShopMethods[];
	total: number;
}
