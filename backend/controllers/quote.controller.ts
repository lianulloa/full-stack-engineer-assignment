import { Request, Response } from "express"

export const listQuotes = async (req: Request, res: Response) => {
  return res.json({
    data: "list of quotes"
  })
}