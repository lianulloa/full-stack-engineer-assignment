import express, { Application } from "express"
import cors from "cors"
import { dbConnection } from './db/config.db';
import { QuoteRouter } from "./routes";

class Server {
  private app: Application
  private port: string
  private apiPathPrefix = "/api"
  private paths = {
    quotes: "/quotes",
    average: "/average",
    slippage: "/slippage"
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || "8080"

    this.connectToDB()
    this.middlewares()
    this.routes()
  }

  async connectToDB() {
    await dbConnection()
  }

  private middlewares() {
    this.app.use(express.static("public"))
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes() {
    this.app.use(this.apiPathPrefix + this.paths.quotes, QuoteRouter)
  }
  
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in http://localhost:"+this.port)
    })
  }
}

export default Server