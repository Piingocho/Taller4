import { Request, Response } from 'express';
import db from './database';

class UserRecursos {

    public async iniciar(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        if (Boolean(email) && Boolean(password)) {
            console.log(req.body);
            const existe = await db.query('SELECT * FROM user WHERE mail_user=? AND pw_user=? ', [email, password]);
            console.log(existe.length);
            if (existe.length > 0) {
                res.json(existe[0]);
            } else {
                res.status(401).json({ error: { mensaje: "La Cuenta No esta Registrada." } });
            }
        } else {
            res.status(403).json({ error: { mensaje: "Debe ingresar un Usuario y Password." } });
        }
    }
    public async inventario(req: Request, res: Response) {
        const inventario = await db.query('SELECT * FROM inventario');
        res.json(inventario);
    }

    public async addInventario(req:Request, res: Response){
        const { costo, nombre, idproducto } = req.body;
        if(costo && nombre && idproducto){
            const verifyID = await db.query('SELECT * FROM inventario WHERE idproducto=?',[idproducto]);
            if(verifyID && verifyID.length>0){
                res.status(403).json({error:"Ya existe el producto"});
            }else
            {
                const producto = {
                    costo,
                    nombre,
                    idproducto
                }
                await db.query('INSERT INTO inventario set ?',[producto]);
                res.json({mensaje: "Producto registrado"});
            }
        }
    }

    public async deleteProducto(req:Request, res:Response){
        const { idproducto } = req.params;
        if(idproducto){
            await db.query("DELETE FROM inventario WHERE idproducto=?",[idproducto]);
            res.json({mensaje:"Producto eliminado"});
        }else{
            res.status(403).json({error:"No se encontro el producto"});
        }
    }

    public async desconectar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //await db.query('DELETE FROM cuentas WHERE id = ?', [id]);
        res.json({ mensaje: "Cuenta Eliminada." });
    }

}


const usuarioRecursos = new UserRecursos();

export default usuarioRecursos;