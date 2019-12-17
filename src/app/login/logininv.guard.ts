import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from 'app/service/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class LogininvGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this.loginService.getUser;
    // console.log("DDD", currentUser)
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
    // throw new Error("Method not implemented.");
  }

  constructor(private loginService: LoginserviceService, private router: Router) { }
}
