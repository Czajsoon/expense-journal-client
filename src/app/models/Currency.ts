import {CurrencyType} from "./CurrencyType";

export default interface Currency {
  currency: CurrencyType,
  currencyCode: string,
  currencyName: string,
  currencyLocale: string
}


