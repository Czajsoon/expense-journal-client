import ExpenseItem from "./ExpenseItem";

export default interface Expense{
  paymentMethodId:string,
  shopMethodId:string,
  dateTime:string,
  amount:number,
  note:string,
  currencyCode:string,
  expenseItems: ExpenseItem[]
}
