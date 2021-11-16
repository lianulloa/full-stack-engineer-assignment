import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { actions as blueQuoteActions, selectors as blueQuoteSelectors } from './store/blueQuote';
import QuoteCard from './components/quoteCard'
import AverageBar from './components/averageBar'
import './App.css'

function App() {
  const quotes = useSelector(blueQuoteSelectors.quotes)
  const average = useSelector(blueQuoteSelectors.average)
  const slippage = useSelector(blueQuoteSelectors.slippage)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(blueQuoteActions.getQuotes())
    dispatch(blueQuoteActions.getAverage())
    dispatch(blueQuoteActions.getSlippage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <AverageBar average={average} />
        <Grid container spacing={2}>
          {quotes && Object.entries(quotes).map(
            ([source, quotesBySource]) =>
              <QuoteCard
                key={source}
                quote={
                  {
                    ...quotesBySource[quotesBySource.length - 1],
                    source
                  }
                }
                slippage={slippage[source]}
              />
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
