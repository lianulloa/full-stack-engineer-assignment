import { createSlice, PayloadAction,  } from "@reduxjs/toolkit"
import { RootState, Dispatch } from "."
import quoteApi from '../api/blueQuote';

interface blueQuoteState {
  quotes: {
    [source: string]: any
  }
}

const initialState: blueQuoteState = {
  quotes: { }
}

const blueQuoteSlice = createSlice({
  name: "blueQuote",
  initialState,
  reducers: {
    setQuotes: (state, action) => {
      state.quotes = action.payload
    },
    setQuotesBySource: (state, action: PayloadAction<{source: string, quotes: any}>) => {
      state.quotes[action.payload.source] = action.payload.quotes
    }
  }
})

export const selectors = {
  quotes: (state: RootState) => {
    return state.blueQuote.quotes
  }
}

export const mutations = blueQuoteSlice.actions

export const actions = {
  getQuotes: (query = {groupBy: "source"}) => (dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await quoteApi.list(query)
        console.log(response.data)
        const quotes = response.data.reduce((acc: any, value) => {
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
  }
}


export default blueQuoteSlice.reducer