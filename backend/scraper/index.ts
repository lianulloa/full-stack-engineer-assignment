import { Browser} from "puppeteer"
import { Quote } from "../models/quote"
import { Finder } from './finders';

class Scraper {
  browser: Browser
  constructor(browser: Browser) {
    this.browser = browser
  }

  async getBlueDolarQuotes(url: string, finder: Finder): Promise<Quote| Quote[] |undefined> {
    const page = await this.browser.newPage()
    await page.goto(url, { waitUntil: "networkidle2" })
    const res = await page.evaluate(finder, url)
    return res
  }
}

export default Scraper