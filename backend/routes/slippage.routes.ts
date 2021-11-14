import { Router } from "express"
import { getSlippage } from '../controllers/slippage.controller';

const router = Router()
router.get("/", getSlippage)

export default router