import Method from "./Method";
import Currency from "./Currency";
import IExpenseItemView from "./ExpenseItemView";

export default interface IExpenseView {
  id: string,
  paymentMethod: Method,
  shopMethod: Method,
  dateTime: number[],
  note: string,
  amount: number,
  originAmount: number,
  expense: boolean,
  currency: Currency,
  originCurrency: Currency,
  expenseItems: IExpenseItemView[]
}
