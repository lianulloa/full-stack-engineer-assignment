"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const config_db_1 = require("./db/config.db");
const routes_1 = require("./routes");
class Server {
    constructor() {
        this.apiPathPrefix = "/api";
        this.paths = {
            quotes: "/quotes",
            average: "/average",
            slippage: "/slippage"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
        this.middlewares();
        this.routes();
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Connecting to db...");
            yield (0, config_db_1.dbConnection)();
        });
    }
    middlewares() {
        this.app.use(express_1.default.static(path_1.default.resolve("./") + "/frontend/build"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPathPrefix + this.paths.quotes, routes_1.QuoteRouter);
        this.app.use(this.apiPathPrefix + this.paths.average, routes_1.AverageRouter);
        this.app.use(this.apiPathPrefix + this.paths.slippage, routes_1.SlippageRouter);
        this.app.use("*", (req, res) => {
            res.sendFile(path_1.default.resolve("./") + "/frontend/build/index.html");
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running in http://localhost:" + this.port);
        });
    }
}
exports.default = Server;
