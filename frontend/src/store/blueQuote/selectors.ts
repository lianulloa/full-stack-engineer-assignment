import { RootState } from ".."

export const selectors = {
  quotes: (state: RootState) => state.blueQuote.quotes,
  average: (state: RootState) => state.blueQuote.average,
  slippage: (state: RootState) => state.blueQuote.slippage
}
