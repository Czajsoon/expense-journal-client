export default interface SearchReceiptQuery {
  paymentMethodId: string;
  shopMethodId: string;
  dateFrom: string;
  dateTo: string;
  amountFrom: number;
  amountTo: number;
  note: string;
  expense: boolean;
}
