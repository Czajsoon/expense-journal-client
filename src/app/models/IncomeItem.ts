import PeriodType from "./PeriodType";
import ProductType from "./ProductType";
import Currency from "./Currency";

export default interface IncomeItem{
  id: string,
  priceId: string,
  productId: string,
  period: PeriodType,
  type: ProductType,
  price: number,
  currency: Currency,
  quantity: number,
  sum: number,
  name: string,
  active: boolean
}
