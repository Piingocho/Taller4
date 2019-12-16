import { Component} from '@angular/core';
//export default conexion;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

//   private datos = {
//     host: 'localhost',
//     user: 'root',
//     password:'',
//     database: 'pagos'
// }
private conexion:any;
  constructor(){
    // this.conexion = createPool(this.datos);

  // this.conexion.getConnection().then((con:any)=>{
  //   this.conexion.releaseConnection(con);
  //   console.log("DB conectada")
  // });
  }
  

}
