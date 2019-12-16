"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./usuario"));
class Server {
    constructor(puerto) {
        this.app = express_1.default();
        this.config(puerto);
        this.rutas();
    }
    config(puerto) {
        this.app.set('port', process.env.PORT || puerto);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    rutas() {
        // this.app.use('/',indexRutas);
        this.app.post('/login', usuario_1.default.iniciar);
        this.app.get('/inventario', usuario_1.default.inventario);
        this.app.post('/inventario', usuario_1.default.addInventario);
        this.app.delete('/inventario/:idproducto', usuario_1.default.deleteProducto);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}
const server = new Server(3500);
server.start();
console.log("Server running...");
