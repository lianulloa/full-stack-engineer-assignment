import React, { FC } from "react"
import Typography from "@mui/material/Typography"

const PriceLabel: FC<{ price: number }> = ({ price }) =>
  <Typography variant="body1">
    ${price.toFixed(2)}
  </Typography>

export default PriceLabel
