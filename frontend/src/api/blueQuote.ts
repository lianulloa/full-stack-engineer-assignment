import ApiSet from "./apiSet"

export interface Quote {
  buy_price: number,
  sell_price: number,
  source: string,
  createdAt?: string
}

interface GroupedQuote {
  _id: string,
  quotes: Omit<Quote, "source">[]
}

const quoteApi = new ApiSet<Quote|GroupedQuote>("quotes")

export default quoteApi