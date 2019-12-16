import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from 'app/service/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class LogininvGuard implements CanActivate  {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this.loginService.getUser;
    if(currentUser){
      return true;
    }
    return false;
    // throw new Error("Method not implemented.");
  }

  constructor(private loginService: LoginserviceService){


  }
}
