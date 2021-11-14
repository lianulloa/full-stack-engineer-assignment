import { Schema, model } from "mongoose"

export interface Quote {
  buy_price: number,
  sell_price: number,
  source: string,
}
export interface IQuote extends Quote {
  createdAt: Date,
  updatedAt: Date
}

const QuoteSchema = new Schema<IQuote>({
  buy_price: {
    type: Number,
    required: [true, "buy_price is required"]
  },
  sell_price: {
    type: Number,
    required: [true, "sell_price is required"]
  },
  source: {
    type: String,
    required: [true, "source is required"]
  }
}, {
  toJSON: {
    transform: function (doc: any, ret: any) {
      delete ret._id
    },
    versionKey: false
  },
  timestamps: true
})

export default model<IQuote>("Quote", QuoteSchema)