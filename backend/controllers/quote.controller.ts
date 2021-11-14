import { Request, Response } from "express"
import QuoteModel, {Quote} from '../models/quote'
import { groupQuotesBy } from "../models/quote.helpers"

export const listQuotes = async (req: Request, res: Response) => {
  const { sortBy = "createdAt", groupBy = "" } = req.query

  try {
    if (!groupBy) {
      const quotes = await QuoteModel.find().sort(sortBy)
      return res.json(quotes)
    } else {
      const grouped = await groupQuotesBy(groupBy, sortBy)
      return res.json(grouped)
    }
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