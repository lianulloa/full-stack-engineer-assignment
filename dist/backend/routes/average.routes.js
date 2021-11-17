"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const average_controller_1 = require("../controllers/average.controller");
const router = (0, express_1.Router)();
router.get("/", average_controller_1.pricesAverage);
exports.default = router;
