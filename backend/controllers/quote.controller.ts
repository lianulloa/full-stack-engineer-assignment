import { Request, Response } from "express"
import QuoteModel from '../models/quote';

export const listQuotes = async (req: Request, res: Response) => {
  const quotes = await QuoteModel.find()
  return res.json(quotes)
}

export const createQuote = async (req: Request, res: Response) => {
  const { body } = req
  const quote = new QuoteModel(body)

  try {
    await quote.save()
    res.json({
      data: quote
    })
  } catch (error) {
    res.status(400).json({
      error
    })
  }
}