import express, { Application, Request, Response } from "express"
import path from "path"
import cors from "cors"
import { dbConnection } from './db/config.db';
import { AverageRouter, QuoteRouter, SlippageRouter } from "./routes";

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

    this.middlewares()
    this.routes()
  }

  async connectToDB() {
    console.log("Connecting to db...")
    await dbConnection()
  }

  private middlewares() {
    this.app.use(express.static(path.resolve("./")+ "/frontend/build"))
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes() {
    this.app.use(this.apiPathPrefix + this.paths.quotes, QuoteRouter)
    this.app.use(this.apiPathPrefix + this.paths.average, AverageRouter)
    this.app.use(this.apiPathPrefix + this.paths.slippage, SlippageRouter)
    this.app.use("*", (req: Request, res: Response): void => {
      res.sendFile(path.resolve("./") + "/frontend/build/index.html")
    })
    
  }
  
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in http://localhost:"+this.port)
    })
  }
}

export default Server