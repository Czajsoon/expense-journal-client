import Receipt from "./Receipt";

export default interface ReceiptResponse{
  receipts: Receipt[],
  totalPages: number;
}
