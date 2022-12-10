import Currency from "./Currency";
import PeriodType from "./PeriodType";
import ProductType from "./ProductType";

export interface IIncomeProduct {
	id: string;
	period: PeriodType;
	type: ProductType;
	currency: Currency;
	price: number;
	name: string;
	active: boolean;
}
