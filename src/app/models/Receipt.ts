export default interface Receipt{
  isExpense: boolean,
  receipt:{
    id: string,
    paymentMethod: string,
    shopMethod: string,
    dateTime: number[],
    note: string,
    amount: number,
    originAmount: number,
    currency: string,
    originCurrency: string,
    expenseItems: number
  }
}
