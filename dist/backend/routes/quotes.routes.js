"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quote_controller_1 = require("../controllers/quote.controller");
const router = (0, express_1.Router)();
router.get("/", quote_controller_1.listQuotes);
// router.post("/", createQuote)
exports.default = router;
