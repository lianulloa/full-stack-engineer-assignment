import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import './App.css'
import { actions as blueQuoteActions, selectors as blueQuoteSelectors } from './store/blueQuote';
import QuoteCard from './components/quoteCard'

function App() {
  const quotes = useSelector(blueQuoteSelectors.quotes)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(blueQuoteActions.getQuotes())
  }, [])
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <h1>quotes</h1>
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
              />
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
