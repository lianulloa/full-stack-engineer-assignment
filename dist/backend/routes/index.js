"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlippageRouter = exports.AverageRouter = exports.QuoteRouter = void 0;
var quotes_routes_1 = require("./quotes.routes");
Object.defineProperty(exports, "QuoteRouter", { enumerable: true, get: function () { return __importDefault(quotes_routes_1).default; } });
var average_routes_1 = require("./average.routes");
Object.defineProperty(exports, "AverageRouter", { enumerable: true, get: function () { return __importDefault(average_routes_1).default; } });
var slippage_routes_1 = require("./slippage.routes");
Object.defineProperty(exports, "SlippageRouter", { enumerable: true, get: function () { return __importDefault(slippage_routes_1).default; } });
