import React, {FC, useState} from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'
import { Quote } from '../api/blueQuote';

const QuoteCard: FC<{ quote: Quote }> = ({ quote }) => {
  const [showBehavior, setShowBehavior] = useState(false)
  return (
    <Grid item xs={12} sm={showBehavior? 12: 6} >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
            Source:
            <Link href={quote.source} style={{paddingLeft: 4}}>{quote.source.split("//")[1].split("/")[0]}</Link>
          </Typography>
          <Grid container spacing={1} >
            <Grid item xs={6}>
              <Typography variant="h4" component="div">
                Buy
              </Typography>
              <Typography variant="body1">
                ${quote.buy_price}
              </Typography>
              <Typography variant="caption">
                  slippage
                </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" component="div">
                Sell
              </Typography>
              <Typography variant="body1">
                ${quote.sell_price}
              </Typography>
              <Typography variant="caption">
                slippage
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => setShowBehavior(!showBehavior)}
          >
            Show behavior
          </Button>
        </CardActions>
      </Card>
    </Grid>

  )
}

export default QuoteCard