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
exports.getPricesAverage = exports.getLastQuoteBySource = exports.getQuotesBy = void 0;
const quote_1 = __importDefault(require("./quote"));
const getQuotesBy = ({ sortBy, from, groupBy, source }) => __awaiter(void 0, void 0, void 0, function* () {
    let toProject = { _id: 0, __v: 0, updatedAt: 0, [groupBy]: 0 };
    const pipeline = quote_1.default.aggregate();
    if (from || source) {
        let match = {};
        if (from)
            match["createdAt"] = { $gte: from };
        if (source)
            match["source"] = source;
        pipeline.match(match);
    }
    if (sortBy) {
        pipeline.sort(sortBy + " source");
    }
    if (groupBy) {
        pipeline.group({
            _id: "$" + groupBy,
            quotes: {
                $push: "$$ROOT"
            }
        });
        toProject = { quotes: toProject };
    }
    return pipeline.project(toProject);
});
exports.getQuotesBy = getQuotesBy;
const getLastQuoteBySource = () => __awaiter(void 0, void 0, void 0, function* () {
    const grouped = yield (0, exports.getQuotesBy)({ groupBy: "source", sortBy: "-createdAt" });
    return grouped.map(quoteGroup => ({
        buy_price: quoteGroup.quotes[0].buy_price,
        sell_price: quoteGroup.quotes[0].sell_price,
        source: quoteGroup._id
    }));
});
exports.getLastQuoteBySource = getLastQuoteBySource;
const getPricesAverage = (lastByGroup = []) => __awaiter(void 0, void 0, void 0, function* () {
    if (!lastByGroup.length) {
        lastByGroup = yield (0, exports.getLastQuoteBySource)();
    }
    const average_buy_price = lastByGroup.reduce((acc, quote) => {
        return acc += quote.buy_price;
    }, 0) / lastByGroup.length;
    const average_sell_price = lastByGroup.reduce((acc, quote) => {
        return acc += quote.sell_price;
    }, 0) / lastByGroup.length;
    return {
        average_buy_price,
        average_sell_price
    };
});
exports.getPricesAverage = getPricesAverage;
