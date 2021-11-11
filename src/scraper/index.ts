import { Browser} from "puppeteer"
import { Quotes } from "../models"
import { Finder } from './finders';

class Scraper {
  browser: Browser
  constructor(browser: Browser) {
    this.browser = browser
  }

  async getBlueDolarQuotes(url: string, finder: Finder): Promise<Quotes| Quotes[]> {
    const page = await this.browser.newPage()
    await page.goto(url, { waitUntil: "networkidle2" })
    const res = await page.evaluate(finder, url)
    return res
  }
}

export default Scraper