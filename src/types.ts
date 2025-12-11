export interface Rate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface CNBRatesResponse {
  date: string;
  publishedCount: number;
  rates: Rate[];
}
