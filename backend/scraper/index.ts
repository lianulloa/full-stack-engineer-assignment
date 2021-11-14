import puppeteer, { Browser} from "puppeteer"
import { Quote } from "../models/quote"
import { FinderSelector} from './finders';
import { createQuotes } from '../controllers/quote.controller';
import { genericFinder } from './finders';

const SOURCES = [
  {
    url: "https://www.ambito.com/contenidos/dolar.html",
    selector: {
      valuesParentSelector: ".variacion-max-min-chico.indicador[data-indice='/dolar/informal']",
      buySelector: ".data-compra",
      sellSelector: ".data-venta"
    }
  },
  {
    url: "https://www.dolarhoy.com",
    selector: {
      valuesParentSelector: "a.title[href='/cotizaciondolarblue'] + .values",
      buySelector: ".compra .val",
      sellSelector: ".venta .val"
    }
  },
  {
    url: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB",
    selector: {
      valuesParentSelector: ".main-container a[href='/MercadosOnline/moneda.html?id=ARSB']",
      buySelector: ".buy-value",
      sellSelector: ".sell-value"
    }
  }
]
class Scraper {
  browser: Browser
  private quotes: Quote[] = []
  constructor(browser: Browser) {
    this.browser = browser
  }

  async getBlueDolarQuotes(url: string, selector: FinderSelector): Promise<Quote| Quote[] |undefined> {
    console.log("getting quote from ", url)
    const page = await this.browser.newPage()
    await page.goto(url, { waitUntil: "networkidle2" })
    const res = await page.evaluate(genericFinder, url, selector)
    if (res) {
      this.quotes.push(res)
      console.log(res)
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
    for (const { url, selector } of SOURCES) {
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