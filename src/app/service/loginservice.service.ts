import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})


export class LoginserviceService {

  constructor(private http: HttpClient) {
    this.currentUserSub = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem("user")));
    this.currentUser = this.currentUserSub.asObservable();
  }


  private currentUserSub: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  private SERVER_URL: string = "http://localhost:3500";
  public login(user: Login) {
    return this.http.post<any>(`${this.SERVER_URL}/login`, user).pipe(
      map(user => {
        if (user.error) {
          const mensaje = user.error.mensaje;
          return ({ error: mensaje });
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSub.next(user);
        return user;
      })
    );
  }

  public getInventario() {
    return this.http.get<any>(`${this.SERVER_URL}/inventario`);
  }

  public addInventario(producto: any) {
    return this.http.post<any>(`${this.SERVER_URL}/inventario`, producto);
  }

  public deleteProducto(idproducto: string | number) {
    return this.http.delete<any>(`${this.SERVER_URL}/inventario/${idproducto}`);
  }

  public logout() {
    this.currentUserSub.next(null);
    localStorage.removeItem("user");
  }

  public get getUser() {
    return this.currentUserSub.value;
  }


}

export interface Login {
  email: string;
  password: string;
}