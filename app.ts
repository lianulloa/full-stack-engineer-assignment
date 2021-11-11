import puppeteer from "puppeteer"
import Scraper from "./src/scraper"
import { AmbitoFinder } from "./src/scraper/finders"

const main = async () => {
  try {
    let browser = await puppeteer.launch()
    const scraper = new Scraper(browser)
    const res = await scraper.getBlueDolarQuotes(
      "https://www.ambito.com/contenidos/dolar.html",
      AmbitoFinder
    )
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}

main()