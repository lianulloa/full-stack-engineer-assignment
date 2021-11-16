import { configureStore } from '@reduxjs/toolkit'
import blueQuoteReducer from "./blueQuote"

const store = configureStore({
  reducer: {
    blueQuote: blueQuoteReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export default store