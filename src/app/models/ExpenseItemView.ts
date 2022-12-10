import Currency from "./Currency";

export default interface IExpenseItemView{
  name:string,
  amount: number,
  sumAmount: number,
  originAmount: number,
  originSumAmount: number,
  quantity: number,
  currency: Currency,
  originCurrency: Currency
}
