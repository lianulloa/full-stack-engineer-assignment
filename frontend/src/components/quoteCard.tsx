import React, {FC} from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'
import { Quote } from '../api/blueQuote';
import { QuoteSlippage } from '../api/slippage';
import SlippageLabel from "./slippageLabel";
import PriceLabel from "./priceLabel";


const QuoteCard: FC<{
  quote: Quote,
  slippage: Omit<QuoteSlippage, "source">,
  onShowBehavior: Function
}> =
  ({ quote, slippage, onShowBehavior }) => {
    return (
      <Grid item xs={12} sm={6} >
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
                <PriceLabel price={quote.buy_price} />
                {slippage && <SlippageLabel slippage={slippage.buy_price_slippage} />}
                
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" component="div">
                  Sell
                </Typography>
                <PriceLabel price={quote.sell_price} />
                {slippage && <SlippageLabel slippage={slippage.sell_price_slippage} />}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => onShowBehavior(quote.source)}
            >
              Show behavior
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
}

export default QuoteCard