import { Dispatch } from '..'
import quoteApi from '../../api/blueQuote'
import { mutations } from '../blueQuote'
import { getPricesAverage } from '../../api/average'


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
            //process Quote if need. (I think I won't need this for the challenge)
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
  }
}
