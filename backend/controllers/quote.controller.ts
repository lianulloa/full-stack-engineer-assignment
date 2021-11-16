import { Request, Response } from "express"
import QuoteModel, {Quote} from '../models/quote'
import { getQuotesBy } from "../models/quote.helpers"

export const listQuotes = async (req: Request, res: Response) => {
  const { sortBy = "createdAt", groupBy, minutesAway = 60, source } = req.query
  const miliseconds = Number(minutesAway) * 60 * 1000
  const from = new Date(Date.now() - miliseconds)

  try {
    const quotes = await getQuotesBy({groupBy, sortBy, from, source})
    return res.json(quotes)
  } catch (e) {
    return res.status(400).json({error: e})
  }
}

//FIXME: just for testing purposes
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

export const createQuotes = async (quotes: Quote[]) => {
  try {
    await QuoteModel.create(quotes)
    console.log("quotes created")
  } catch (e) {
    console.error(e)
    throw e
  }
}