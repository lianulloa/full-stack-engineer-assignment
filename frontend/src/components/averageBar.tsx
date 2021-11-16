import React, {FC} from "react"
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import { AveragePrice } from '../api/average';

const AverageBar: FC<{average:AveragePrice|null}> =  ({average}) => {
  return (
    <React.Fragment>
      <Typography variant="h4" sx={{mt: 3}}>
        Average
      </Typography>
      <Typography variant="h5" sx={{display: "inline-block"}}>
        Buy: ${average?.average_buy_price.toFixed(2)}
      </Typography>
      <Typography variant="h5" sx={{display: "inline-block", ml: 2}}>
        Sell: ${average?.average_sell_price.toFixed(2)}
      </Typography>
      <Divider sx={{mt: 1.5, mb: 5}}/>
    </React.Fragment>
  )
}

export default AverageBar