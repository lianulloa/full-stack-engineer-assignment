import { Router } from "express"
import { listQuotes } from "../controllers/quote.controller"

const router = Router() 
router.get("/", listQuotes)

export default router