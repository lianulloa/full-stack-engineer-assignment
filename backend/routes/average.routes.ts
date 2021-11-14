import { Router } from "express"
import { pricesAverage } from "../controllers/average.controller"

const router = Router()
router.get("/", pricesAverage)

export default router