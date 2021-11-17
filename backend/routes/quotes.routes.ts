import { Router } from "express"
import {
  listQuotes,
  // createQuote
} from '../controllers/quote.controller';

const router = Router() 
router.get("/", listQuotes)
// router.post("/", createQuote)

export default router