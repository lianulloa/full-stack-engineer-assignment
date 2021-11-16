import React, { FC, useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';import QuoteChart from './chart'
import { Quote } from "../api/blueQuote";

const RANGES = {
  "1 hour": 60,
  "1 day": 1440,
  "1 week": 10080
}

const BehaviorModal: FC<{
  open: boolean,
  onClose: any,
  quotes: Omit<Quote, "source">[]
}> =
  ({ open, onClose, quotes }) => {
    const [timeRange, setTimeRange] = useState("1 hour")

    const handleRange = (e: any, value: string) => {
      setTimeRange(value)
    }

    return (
      <Dialog 
        open={open}
        onClose={onClose}
      >
        <Card sx={{minWidth: 500}}>
          <CardContent>
            <ToggleButtonGroup
              value={timeRange}
              size="small"
              exclusive
              onChange={handleRange}
            >
              {Object.keys(RANGES).map(range => 
                <ToggleButton value={range} >
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