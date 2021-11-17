"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuotes = exports.listQuotes = void 0;
const quote_1 = __importDefault(require("../models/quote"));
const quote_helpers_1 = require("../models/quote.helpers");
const listQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy = "createdAt", groupBy, minutesAway = 60, source } = req.query;
    const miliseconds = Number(minutesAway) * 60 * 1000;
    const from = new Date(Date.now() - miliseconds);
    try {
        const quotes = yield (0, quote_helpers_1.getQuotesBy)({ groupBy, sortBy, from, source });
        return res.json(quotes);
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
});
exports.listQuotes = listQuotes;
const createQuotes = (quotes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield quote_1.default.create(quotes);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
});
exports.createQuotes = createQuotes;
// export const createQuote = async (req: Request, res: Response) => {
//   const { body } = req
//   const quote = new QuoteModel(body)
//   try {
//     await quote.save()
//     res.json({
//       data: quote
//     })
//   } catch (error) {
//     res.status(400).json({
//       error
//     })
//   }
// }
