import React, { FC } from "react"
import Typography from '@mui/material/Typography';

const getSlippageColor = (slippage: number) => {
  return slippage <= 0 ? "success.light" : "error.light"
}


const SlippageLabel: FC<{ slippage: number }> = ({ slippage }) => {
  return (
    <Typography
      variant="caption"
      color={getSlippageColor(slippage)}
    >
      {slippage.toFixed(2)}
    </Typography>
  )
}

export default SlippageLabel

