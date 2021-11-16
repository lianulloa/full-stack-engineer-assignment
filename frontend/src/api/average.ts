import request from "../utils/request"

export interface AveragePrice {
  average_buy_price: number,
  average_sell_price: number
}

export function getPricesAverage() {
  return request.get<AveragePrice>("average")
}