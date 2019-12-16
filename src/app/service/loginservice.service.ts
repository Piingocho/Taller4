import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LoginserviceService {

  constructor() { 
    this.currentUserSub = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem("user")));
    this.currentUser = this.currentUserSub.asObservable();
  }
  

  private currentUserSub: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  public login(user:Login){
    
    localStorage.setItem("user",JSON.stringify(user));
    this.currentUserSub.next(user);
    return user;
  }

  public logout(){
    localStorage.removeItem("user");
    this.currentUserSub.next(null);
  }

  public getUser(){
    return this.currentUserSub.value;
  }


}

export interface Login{
  username: string;
  password: string;
}