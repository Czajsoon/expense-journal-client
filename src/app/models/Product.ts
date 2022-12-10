import PeriodType from "./PeriodType";
import ProductType from "./ProductType";
import Currency from "./Currency";
import Price from "./Price";

export default interface Product{
  id: string,
  period: PeriodType,
  type: ProductType,
  currency: Currency,
  price: Price[],
  name: string,
  active: boolean
}
