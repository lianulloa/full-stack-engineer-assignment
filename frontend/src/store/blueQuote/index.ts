import { createSlice, PayloadAction,  } from "@reduxjs/toolkit"
import { AveragePrice, } from '../../api/average'
import { QuoteSlippage } from '../../api/slippage';
export * from "./selectors"
export * from "./actions"

interface blueQuoteState {
  quotes: {
    [source: string]: any
  },
  average: AveragePrice | null,
  slippage: {
    [source: string]: Omit<QuoteSlippage, "source">
  }
}

const initialState: blueQuoteState = {
  quotes: {},
  average: null,
  slippage: {}
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
    },
    setAverage: (state, action) => {
      state.average = action.payload
    },
    setQuoteSlippage: (state, action) => {
      state.slippage = action.payload
    }
  }
})

export const mutations = blueQuoteSlice.actions

export default blueQuoteSlice.reducer

