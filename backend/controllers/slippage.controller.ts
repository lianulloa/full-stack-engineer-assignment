import { Request, Response } from "express"
import { getLastQuoteBySource, getPricesAverage } from '../models/quote.helpers';

export const getSlippage = async (req: Request, res: Response) => {
  try {
    const lastByGroup = await getLastQuoteBySource()
    const average = await getPricesAverage(lastByGroup)
    const slippage = lastByGroup.map(
      quote => ({
        buy_price_slippage: ((quote.buy_price * 100) / average.average_buy_price) - 100,
        sell_price_slippage: ((quote.sell_price * 100) / average.average_sell_price) - 100,
        source: quote.source
      })
    )
    return res.json(slippage)
  } catch (e) {
    return res.status(400).json({error: e})
  }
}
