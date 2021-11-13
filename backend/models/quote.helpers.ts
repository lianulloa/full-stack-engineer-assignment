import QuoteModel from "./quote"

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

export const getPricesAverage = async () => {
  const grouped = await groupQuotesBy("source", "-createdAt")
  const lastByGroup = grouped.map(quoteGroup => ({
    buy_price: quoteGroup.quotes[0].buy_price,
    sell_price: quoteGroup.quotes[0].sell_price
  }))

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
