import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usuarioRecursos from './usuario';

class Server {
    public app: Application;
    constructor(puerto: Number) {
        this.app = express();
        this.config(puerto);
        this.rutas();
    }

    config(puerto: Number): void {
        this.app.set('port', process.env.PORT || puerto);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

    }        

    rutas(): void {
        // this.app.use('/',indexRutas);
        this.app.post('/login', usuarioRecursos.iniciar);
        this.app.get('/inventario', usuarioRecursos.inventario);
        this.app.post('/inventario',usuarioRecursos.addInventario);
        this.app.delete('/inventario/:idproducto',usuarioRecursos.deleteProducto);


    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }

    
}

const server = new Server(3500);

server.start();
console.log("Server running...");