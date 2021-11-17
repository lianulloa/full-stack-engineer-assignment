import puppeteer, { Browser} from "puppeteer"
import { Quote } from "../models/quote"
import { FinderSelector} from './finders';
import { createQuotes } from '../controllers/quote.controller';
import { genericFinder } from './finders';
import SourceModel from '../models/source';

class Scraper {
  browser: Browser
  private quotes: Quote[] = []
  constructor(browser: Browser) {
    this.browser = browser
  }

  async getBlueDolarQuotes(url: string, selector: FinderSelector): Promise<Quote| Quote[] |undefined> {
    const page = await this.browser.newPage()
    await page.goto(url, { waitUntil: "networkidle2" })
    const res = await page.evaluate(genericFinder, url, selector)
    if (res) {
      this.quotes.push(res)
    }
    return res
  }

  async saveQuotes() {
    createQuotes(this.quotes)
  }

  async close() {
    await this.browser.close()
    this.quotes = []
  }
}

export const scrapperJob = async () => {
  try {
    let browser = await puppeteer.launch()
    const scraper = new Scraper(browser)
    const promises = []
    const sources = await SourceModel.find({active: true})
    for (const { url, selector } of sources) {
      promises.push(scraper.getBlueDolarQuotes(
        url,
        selector
      ))
    }
    await Promise.all(promises)
    scraper.saveQuotes()
    scraper.close()
  } catch (e) {
    console.error(e)
  }
}

export default Scraper