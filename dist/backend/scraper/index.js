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
exports.scrapperJob = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const quote_controller_1 = require("../controllers/quote.controller");
const finders_1 = require("./finders");
const source_1 = __importDefault(require("../models/source"));
class Scraper {
    constructor(browser) {
        this.quotes = [];
        this.browser = browser;
    }
    getBlueDolarQuotes(url, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.browser.newPage();
            yield page.goto(url, { waitUntil: "networkidle2" });
            const res = yield page.evaluate(finders_1.genericFinder, url, selector);
            if (res) {
                this.quotes.push(res);
            }
            return res;
        });
    }
    saveQuotes() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, quote_controller_1.createQuotes)(this.quotes);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
            this.quotes = [];
        });
    }
}
const scrapperJob = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let browser = yield puppeteer_1.default.launch();
        const scraper = new Scraper(browser);
        const promises = [];
        const sources = yield source_1.default.find({ active: true });
        for (const { url, selector } of sources) {
            promises.push(scraper.getBlueDolarQuotes(url, selector));
        }
        yield Promise.all(promises);
        scraper.saveQuotes();
        scraper.close();
    }
    catch (e) {
        console.error(e);
    }
});
exports.scrapperJob = scrapperJob;
exports.default = Scraper;
