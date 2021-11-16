import { Dispatch } from '..'
import quoteApi from '../../api/blueQuote'
import { mutations } from '../blueQuote'
import { getPricesAverage } from '../../api/average'
import { getQuoteSlippage } from '../../api/slippage';


export const actions = {
  getQuotes: (query = {groupBy: "source", minutesAway: 1440}) => (dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await quoteApi.list(query)
        const quotes = data.reduce((acc: any, value) => {
          if ("_id" in value) {
            //GroupedQuote
            acc[value._id] = value.quotes
          } else {
            //process Quote if needed. (I think I won't need this for the challenge)
          }
          return acc
        }, {})
        dispatch(mutations.setQuotes(quotes))
        resolve(quotes)
      } catch (e) {
        reject(e)
      }
    })
  },
  getQuotesBySource: (query: {source:string, minutesAway: number}) => (dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await quoteApi.list({
          source: query.source,
          minutesAway: query.minutesAway
        })
        dispatch(mutations.setQuotesBySource({
          source: query.source,
          quotes: data
        }))
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  },
  getAverage: () => (dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await getPricesAverage()
        dispatch(mutations.setAverage(data))
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  },
  getSlippage: () => (dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await getQuoteSlippage()
        const slippage = data.reduce((acc: any, value) => {
          const {source, buy_price_slippage, sell_price_slippage} = value
          acc[source] = {buy_price_slippage, sell_price_slippage}
          return acc
        }, {})
        dispatch(mutations.setQuoteSlippage(slippage))
        resolve(slippage)
      } catch (e) {
        reject(e)
      }
    })
  },
}
