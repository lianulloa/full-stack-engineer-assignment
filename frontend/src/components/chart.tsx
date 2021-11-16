import React, { FC } from "react"
import { AxisOptions, Chart } from "react-charts"
import { Quote } from '../api/blueQuote';

const QuoteChart: FC<{quotes: Omit<Quote, "source">[]}> = ({quotes}) => {
  const primaryAxis = React.useMemo<
    AxisOptions<{createdAt: string, price: number}>
  >(
    () => ({
      getValue: (datum) => new Date(datum.createdAt),
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<{createdAt: string, price: number}>[]
  >(
    () => [
      {
        getValue: (datum) => datum.price,
      },
    ],
    []
  )

  const data = []
  data.push({
    label: "Buy",
    data: quotes.map(quote => ({
      price: quote.buy_price,
      createdAt: quote.createdAt
    }))
  })
  data.push({
    label: "Sell",
    data: quotes.map(quote => ({
      price: quote.sell_price,
      createdAt: quote.createdAt
    }))
  })
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
)
}

export default QuoteChart