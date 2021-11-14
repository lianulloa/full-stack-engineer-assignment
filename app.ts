import dotenv from "dotenv"
import cron from "node-cron"
import Server from "./backend/server"
import {scrapperJob} from "./backend/scraper"

dotenv.config()

const main = async () => {

  const server = new Server()
  await server.connectToDB()
  server.listen()

  cron.schedule("* * * * *",scrapperJob)

}

main()