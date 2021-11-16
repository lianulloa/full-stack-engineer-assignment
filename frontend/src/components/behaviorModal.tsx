import React, { FC, useState } from "react"
import { useDispatch } from "react-redux"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'
import QuoteChart from './chart'
import { Quote } from "../api/blueQuote";
import { actions } from '../store/blueQuote/actions';

const RANGES = {
  "1 hour": 60,
  "1 day": 1440,
  "1 week": 10080,
  "1 month": 43200
}

const BehaviorModal: FC<{
  open: boolean,
  onClose: any,
  quotes: Omit<Quote, "source">[],
  source: string
}> =
  ({ open, onClose, quotes, source }) => {
  const [timeRange, setTimeRange] = useState("1 hour")
  const dispatch = useDispatch()

  const handleRange = (e: any, value: keyof typeof RANGES) => {
    setTimeRange(value)
    dispatch(actions.getQuotesBySource({source, minutesAway: RANGES[value]}))
  }

  return (
    <Dialog 
      open={open}
      onClose={onClose}
    >
      <Card sx={{minWidth: 500}}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
            Source:
            <Link href={source} style={{ paddingLeft: 4 }}>
              {source && source.split("//")[1].split("/")[0]}
            </Link>
          </Typography>
          <ToggleButtonGroup
            value={timeRange}
            size="small"
            exclusive
            onChange={handleRange}
          >
            {Object.keys(RANGES).map(range => 
              <ToggleButton key={range} value={range} >
                {range}
              </ToggleButton>
            )}
          </ToggleButtonGroup>
          <QuoteChart quotes={quotes} />
        </CardContent>
      </Card>
    </Dialog>
    
  )
}

export default BehaviorModal