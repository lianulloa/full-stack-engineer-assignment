import request from "../utils/request"

export interface QuoteSlippage {
  buy_price_slippage: number,
  sell_price_slippage: number,
  source: string
}

export function getQuoteSlippage() {
  return request.get<QuoteSlippage[]>("slippage")
}