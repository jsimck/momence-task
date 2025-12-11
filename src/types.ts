declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CNB_RATES_BASE_URL: string;
    }
  }
}

export interface Currency {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface CNBRatesResponse {
  date: string;
  publishedCount: number;
  rates: Currency[];
}
