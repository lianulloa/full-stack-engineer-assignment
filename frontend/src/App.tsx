import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from "react-redux"
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { actions as blueQuoteActions, selectors as blueQuoteSelectors } from './store/blueQuote';
import QuoteCard from './components/quoteCard'
import AverageBar from './components/averageBar'
import './App.css'
import BehaviorModal from './components/behaviorModal'

function App() {
  const quotes = useSelector(blueQuoteSelectors.quotes)
  const average = useSelector(blueQuoteSelectors.average)
  const slippage = useSelector(blueQuoteSelectors.slippage)
  const dispatch = useDispatch()
  let cancelInterval: any = useRef()

  const [showModal, setShowModal] = useState(false)
  const [chartSource, setChartSource] = useState("")
  const handleShowModal = (source: string) => {
    setShowModal(true)
    setChartSource(source)
    clearInterval(cancelInterval.current)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    cancelInterval.current = setUpInterval()
  }

  const refreshData = () => {
    dispatch(blueQuoteActions.getQuotes())
    dispatch(blueQuoteActions.getAverage())
    dispatch(blueQuoteActions.getSlippage())
  }
  const setUpInterval = () => {
    return setInterval(refreshData, 15000)
  }

  useEffect(() => {
    refreshData()
    cancelInterval.current = setUpInterval()
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
                onShowBehavior={handleShowModal}
              />
          )}
        </Grid>
        <BehaviorModal
          open={showModal}
          onClose={handleCloseModal}
          quotes={quotes[chartSource]}
          source={chartSource}
        />
      </Container>
    </React.Fragment>
  );
}

export default App;
