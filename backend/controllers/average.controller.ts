import { Request, Response } from "express"
import { getPricesAverage } from "../models/quote.helpers"

export const pricesAverage = async (req: Request, res: Response) => {
  try {
    const lastByGroup = await getPricesAverage()
    return res.json(lastByGroup)
  } catch (e) {
    return res.status(400).json({error: e})
  }
}
