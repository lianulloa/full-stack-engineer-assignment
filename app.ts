import dotenv from "dotenv"
import Server from "./backend/server"
import {scrapperJob} from "./backend/scraper"

dotenv.config()

const main = async () => {

  const server = new Server()
  await server.connectToDB()
  server.listen()

  scrapperJob()

}

main()