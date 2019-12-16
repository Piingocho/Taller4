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
const database_1 = __importDefault(require("./database"));
class UserRecursos {
    iniciar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (Boolean(email) && Boolean(password)) {
                console.log(req.body);
                const existe = yield database_1.default.query('SELECT * FROM user WHERE mail_user=? AND pw_user=? ', [email, password]);
                console.log(existe.length);
                if (existe.length > 0) {
                    res.json(existe[0]);
                }
                else {
                    res.status(401).json({ error: { mensaje: "La Cuenta No esta Registrada." } });
                }
            }
            else {
                res.status(403).json({ error: { mensaje: "Debe ingresar un Usuario y Password." } });
            }
        });
    }
    inventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventario = yield database_1.default.query('SELECT * FROM inventario');
            res.json(inventario);
        });
    }
    addInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { costo, nombre, idproducto } = req.body;
            if (costo && nombre && idproducto) {
                const verifyID = yield database_1.default.query('SELECT * FROM inventario WHERE idproducto=?', [idproducto]);
                if (verifyID && verifyID.length > 0) {
                    res.status(403).json({ error: "Ya existe el producto" });
                }
                else {
                    const producto = {
                        costo,
                        nombre,
                        idproducto
                    };
                    yield database_1.default.query('INSERT INTO inventario set ?', [producto]);
                    res.json({ mensaje: "Producto registrado" });
                }
            }
        });
    }
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idproducto } = req.params;
            if (idproducto) {
                yield database_1.default.query("DELETE FROM inventario WHERE idproducto=?", [idproducto]);
                res.json({ mensaje: "Producto eliminado" });
            }
            else {
                res.status(403).json({ error: "No se encontro el producto" });
            }
        });
    }
    desconectar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //await db.query('DELETE FROM cuentas WHERE id = ?', [id]);
            res.json({ mensaje: "Cuenta Eliminada." });
        });
    }
}
const usuarioRecursos = new UserRecursos();
exports.default = usuarioRecursos;
