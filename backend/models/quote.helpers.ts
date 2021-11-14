import QuoteModel from "./quote"
import { Quote } from './quote';

export const groupQuotesBy = async (group: any, sortBy: any) => {
  return QuoteModel.aggregate()
    .sort(sortBy)
    .group({
      _id: "$" + group,
      quotes: {
        $push: "$$ROOT"
      }
    })
    .project({ quotes: { _id: 0, __v: 0, updatedAt: 0, [group]: 0 } })
}

type getLastQuoteBySource = () => Promise<Quote[]>

export const getLastQuoteBySource: getLastQuoteBySource = async () => {
  const grouped = await groupQuotesBy("source", "-createdAt")
  return grouped.map(quoteGroup => ({
    buy_price: quoteGroup.quotes[0].buy_price,
    sell_price: quoteGroup.quotes[0].sell_price,
    source: quoteGroup._id
  }))

}

export const getPricesAverage = async (lastByGroup: Quote[] = []) => {
  if (!lastByGroup.length) {
    lastByGroup = await getLastQuoteBySource()
  }

  const average_buy_price = lastByGroup.reduce((acc, quote) => {
    return acc += quote.buy_price
  }, 0) / lastByGroup.length

  const average_sell_price = lastByGroup.reduce((acc, quote) => {
    return acc += quote.sell_price
  }, 0) / lastByGroup.length

  return {
    average_buy_price,
    average_sell_price
  }
}
