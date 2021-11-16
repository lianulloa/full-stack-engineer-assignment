import QuoteModel from "./quote"
import { Quote } from './quote';

interface AggregateOptions {
  groupBy?: any
  sortBy?: any,
  from?: Date,
  source?: any
}

export const getQuotesBy = async ({sortBy, from,groupBy, source}: AggregateOptions) => {
  let toProject: any = { _id: 0, __v: 0, updatedAt: 0, [groupBy]: 0 }

  const pipeline = QuoteModel.aggregate()
  if (from || source) {
    let match: any = {}
    if (from) match["createdAt"] = { $gte: from }
    if (source) match["source"] = source
    
    pipeline.match(match)
  }

  if (sortBy) {
    pipeline.sort(sortBy + " source")
  }

  if (groupBy) {
    pipeline.group({
      _id: "$" + groupBy,
      quotes: {
        $push: "$$ROOT"
      }
    })
    toProject = { quotes: toProject }
  }


  return pipeline.project(toProject)

}

type getLastQuoteBySource = () => Promise<Quote[]>

export const getLastQuoteBySource: getLastQuoteBySource = async () => {
  const grouped = await getQuotesBy({ groupBy: "source",  sortBy:"-createdAt"})
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
