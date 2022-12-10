import Method from "./Method";
import Currency from "./Currency";
import IExpenseItemView from "./ExpenseItemView";
import IncomeItem from "./IncomeItem";

export default interface IIncomeView{
  id: string,
  dateTime: number[],
  note: string,
  amount: number,
  originAmount: number,
  expense: boolean,
  currency: Currency,
  originCurrency: Currency,
  products: IncomeItem[]
}
