import IncomeItem from "./IncomeItem";
import Currency from "./Currency";

export default interface Income{
  dateTime: string,
  items: IncomeItem[],
  originCurrency: Currency,
  note: string,
  originAmount: number,
  amount: number,
  currency: Currency
}
