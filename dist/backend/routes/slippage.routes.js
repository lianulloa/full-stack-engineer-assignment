"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slippage_controller_1 = require("../controllers/slippage.controller");
const router = (0, express_1.Router)();
router.get("/", slippage_controller_1.getSlippage);
exports.default = router;
