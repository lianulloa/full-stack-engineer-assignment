import puppeteer from "puppeteer"
import dotenv from "dotenv"
import Server from "./backend/server"
import Scraper from "./backend/scraper"
import { AmbitoFinder } from "./backend/scraper/finders"

const main = async () => {
  // try {
  //   let browser = await puppeteer.launch()
  //   const scraper = new Scraper(browser)
  //   const res = await scraper.getBlueDolarQuotes(
  //     "https://www.ambito.com/contenidos/dolar.html",
  //     AmbitoFinder
  //   )
  //   console.log(res)
  // } catch (error) {
  //   console.error(error)
  // }

  dotenv.config()
  const server = new Server()

  server.listen()
}

main()